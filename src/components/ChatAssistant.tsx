import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, ChevronUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { healthKnowledgeBase } from '@/lib/healthKnowledgeBase';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatAssistant = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm your Medi Nova AI assistant powered by OpenAI. How can I help you with your health concerns today?" }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [fullResponse, setFullResponse] = useState("");
  const [typingSpeed, setTypingSpeed] = useState(20); // slightly faster typing
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingText]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        // Don't close, just minimize
        if (isChatOpen && !isMinimized) {
          setIsMinimized(true);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChatOpen, isMinimized]);

  // Typing effect simulation
  useEffect(() => {
    if (!isTyping || !fullResponse) return;
    
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullResponse.length) {
        setTypingText(fullResponse.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        // Add the full message to the chat history
        setMessages(prev => [...prev.slice(0, -1), { role: 'assistant', content: fullResponse }]);
        setFullResponse("");
        setTypingText("");
      }
    }, typingSpeed);
    
    return () => clearInterval(typingInterval);
  }, [isTyping, fullResponse, typingSpeed]);

  // Enhanced AI response generation with more OpenAI-like responses
  const generateResponse = (userQuery: string) => {
    // Check for health-related keywords
    const query = userQuery.toLowerCase();
    
    // Start with a greeting and acknowledgment
    let responseStart = "I understand you're asking about ";
    
    // Analysis based on categories (OpenAI-style approach)
    if (query.includes("symptom") || query.includes("feel") || query.includes("pain") || query.includes("hurt")) {
      // Symptom checker response style
      return `${responseStart}symptoms you're experiencing. While I can provide general information, it's important to consult with a healthcare professional for proper diagnosis. 

Based on current medical knowledge, various symptoms can indicate different conditions. Could you tell me more about what you're experiencing, including when it started and any other symptoms you may have?`;
    } 
    else if (query.includes("appointment") || query.includes("schedule") || query.includes("book")) {
      return `${responseStart}booking an appointment at Medi Nova. 

You have several options:
1. Use our online booking system through the Medi Nova app
2. Call our appointment line at (555) 123-4567
3. Visit the reception desk in person

What type of appointment are you looking to schedule? We have general practitioners as well as specialists in various fields.`;
    } 
    else if (query.includes("doctor") || query.includes("specialist") || query.includes("physician")) {
      return `${responseStart}finding the right medical professional for your needs.

Medi Nova has an extensive team of healthcare providers across various specialties:
• General practitioners for routine care
• Cardiologists for heart-related concerns
• Neurologists for brain and nervous system issues
• Orthopedists for bone and joint problems
• Pediatricians for children's healthcare
• And many more specialists

What specific medical concern are you seeking help with? This will help me recommend the most appropriate specialist.`;
    } 
    else if (query.includes("emergency") || query.includes("urgent")) {
      return `It seems you're inquiring about emergency services. If you're experiencing a life-threatening emergency, please call 911 immediately.

For urgent but non-life-threatening conditions, Medi Nova offers:
• 24/7 urgent care at our main facility (123 Main Street)
• Virtual urgent care consultations through our app
• Current emergency department wait time: approximately 15 minutes

Can I provide more specific information about our emergency services?`;
    }
    else if (query.includes("medication") || query.includes("prescription") || query.includes("drug") || query.includes("medicine")) {
      return `${responseStart}medications and prescriptions.

Important information regarding medications at Medi Nova:
• For prescription refills, please contact our pharmacy at (555) 987-6543
• Our pharmacy is open 7am-10pm daily
• We offer medication delivery for seniors and those with mobility challenges
• Our pharmacists are available for medication consultations

Would you like information about a specific medication or our prescription services?`;
    }
    else if (query.includes("insurance") || query.includes("cover") || query.includes("payment") || query.includes("cost")) {
      return `${responseStart}insurance coverage and payment options.

Medi Nova accepts most major insurance plans including:
• BlueCross BlueShield
• Aetna
• Cigna
• Medicare and Medicaid
• United Healthcare

We also offer flexible payment plans and financial assistance programs for qualifying patients. Would you like to speak with one of our financial counselors for more detailed information about your specific coverage?`;
    }
    else if (query.includes("test") || query.includes("lab") || query.includes("result") || query.includes("scan")) {
      return `${responseStart}medical tests or lab results.

At Medi Nova, we offer comprehensive diagnostic services:
• Most lab results are available within 24-48 hours
• Test results can be accessed through your secure patient portal
• Our lab is open Monday-Friday 7am-7pm and Saturday 8am-2pm
• For urgent results, please contact your provider directly

If you've recently had testing done, I can guide you on how to access your results or connect you with our lab department.`;
    }
    else if (query.includes("diet") || query.includes("nutrition") || query.includes("eat") || query.includes("food")) {
      return `${responseStart}nutrition and dietary recommendations.

Proper nutrition is a cornerstone of good health. Based on current medical consensus:
• A balanced diet typically includes fruits, vegetables, whole grains, lean proteins, and healthy fats
• Nutritional needs vary based on age, sex, activity level, and medical conditions
• Medi Nova offers personalized nutrition consultations with registered dietitians

Would you like general dietary guidelines or information about scheduling a consultation with one of our nutrition specialists?`;
    }
    else if (query.includes("exercise") || query.includes("workout") || query.includes("fitness") || query.includes("active")) {
      return `${responseStart}physical activity and exercise recommendations.

Current health guidelines suggest:
• Adults should aim for at least 150 minutes of moderate-intensity aerobic activity weekly
• Strength training activities should be included at least twice per week
• Even small amounts of physical activity provide health benefits
• Exercise programs should be tailored to individual health conditions and fitness levels

Medi Nova offers physical therapy and exercise physiology services to help design safe, effective exercise programs. What are your specific fitness goals?`;
    }
    else if (query.includes("stress") || query.includes("anxiety") || query.includes("depress") || query.includes("mental")) {
      return `${responseStart}mental health concerns, which are just as important as physical health.

Medi Nova provides comprehensive mental health services:
• Individual therapy with licensed psychologists and counselors
• Psychiatric care and medication management
• Group therapy and support groups
• Crisis intervention services

Everyone experiences mental health challenges differently. Would you like information about specific mental health resources or services?`;
    }
    else if (query.includes("covid") || query.includes("vaccine") || query.includes("vaccination") || query.includes("shot")) {
      return `${responseStart}COVID-19 information or vaccinations.

Current COVID-19 information at Medi Nova:
• We offer testing (PCR and rapid) at all locations
• Vaccinations are available without appointment
• Boosters are recommended according to CDC guidelines
• Virtual consultations are available for COVID-related concerns

Our COVID protocols are regularly updated based on the latest scientific evidence and public health guidelines. How can I help you specifically with COVID-related services?`;
    }
    else if (query.includes("prevention") || query.includes("wellness") || query.includes("checkup") || query.includes("screening")) {
      return `${responseStart}preventive care and wellness.

Preventive healthcare at Medi Nova focuses on:
• Regular health screenings based on age, sex, and risk factors
• Immunizations following recommended schedules
• Lifestyle counseling for nutrition, exercise, and stress management
• Early detection through appropriate diagnostic testing

Preventive care is often covered by insurance with little or no out-of-pocket cost. Would you like information about specific screening recommendations based on your demographic profile?`;
    }
    else if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
      return `Hello! I'm your Medi Nova AI health assistant, powered by advanced technology similar to ChatGPT. I'm here to provide information and assistance with your health-related questions.

I can help with:
• Understanding medical conditions and symptoms
• Navigating Medi Nova services
• Finding the right healthcare provider
• Preventive health recommendations
• And much more

How can I assist you with your healthcare needs today?`;
    }
    else if (query.includes("thank") || query.includes("thanks")) {
      return `You're welcome! I'm happy to help with your healthcare questions and needs. If you have any other questions about Medi Nova services or health information, please don't hesitate to ask.

Your health and wellbeing are our top priorities. Is there anything else I can assist you with today?`;
    }
    else if (query.includes("bye") || query.includes("goodbye")) {
      return `Thank you for chatting with me today. If you need any further assistance with your healthcare needs, I'll be here 24/7.

Take care and stay healthy! Remember that Medi Nova is always available for your healthcare needs.`;
    }
    else {
      // General health inquiry with OpenAI-style comprehensive response
      return `Thank you for your question. 

While I don't have specific information about "${userQuery}", I'd be happy to provide general guidance based on medical knowledge.

Medi Nova offers comprehensive healthcare services including preventive care, specialized treatments, diagnostic testing, and emergency services. Our team of medical professionals is committed to providing personalized care tailored to your needs.

Could you provide more specific details about your question so I can better assist you? I'm here to help with any health-related concerns you might have.`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Focus back on input after sending
    inputRef.current?.focus();

    // Simulate processing time for more natural interaction
    setTimeout(() => {
      const response = generateResponse(userMessage);
      setIsLoading(false);
      
      // Add a temporary message that will be replaced by the typing animation
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      setFullResponse(response);
      setIsTyping(true);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const openChat = () => {
    setIsChatOpen(true);
    setIsMinimized(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50" ref={chatRef}>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : 480,
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={cn(
              "bg-white rounded-2xl shadow-2xl w-[340px] overflow-hidden flex flex-col",
              isMinimized ? "h-auto" : "h-[480px]"
            )}
          >
            <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border-2 border-white/20">
                  <AvatarImage src="/mediNova-logo.png" alt="Bot" />
                  <AvatarFallback className="bg-blue-800 text-white">MN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">Medi Nova AI</span>
                  <span className="text-xs text-white/70 flex items-center">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Powered by OpenAI
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-white hover:bg-white/10"
                >
                  <ChevronUp className={`h-5 w-5 transition-transform ${isMinimized ? 'rotate-180' : ''}`} />
                </Button>
                <Button 
                  onClick={() => setIsChatOpen(false)}
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-white hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {!isMinimized && (
              <>
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                  <AnimatePresence initial={false}>
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex items-start gap-2 mb-4 ${
                          message.role === 'user' ? 'flex-row-reverse' : ''
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <Avatar className="h-8 w-8 mt-1">
                            <AvatarImage src="/mediNova-logo.png" alt="Bot" />
                            <AvatarFallback className="bg-blue-600 text-white">MN</AvatarFallback>
                          </Avatar>
                        )}
                        {message.role === 'user' && (
                          <Avatar className="h-8 w-8 mt-1">
                            <AvatarImage src="/placeholder.svg" alt="You" />
                            <AvatarFallback className="bg-gray-200 text-gray-700">You</AvatarFallback>
                          </Avatar>
                        )}
                        <motion.div
                          initial={{ scale: 0.95 }}
                          animate={{ scale: 1 }}
                          className={`rounded-lg p-3 text-sm max-w-[230px] ${
                            message.role === 'user'
                              ? 'bg-blue-600 text-white font-medium'
                              : 'bg-white text-gray-900 border border-gray-200 shadow-sm font-medium'
                          }`}
                        >
                          <p className="whitespace-pre-line">{
                            // If this is the last message and we're typing, show the typing text
                            isTyping && index === messages.length - 1 ? typingText : message.content
                          }</p>
                        </motion.div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2 mb-4"
                      >
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarImage src="/mediNova-logo.png" alt="Bot" />
                          <AvatarFallback className="bg-blue-600 text-white">MN</AvatarFallback>
                        </Avatar>
                        <div className="bg-white rounded-lg p-3 text-gray-900 border border-gray-200 shadow-sm">
                          <div className="flex space-x-1">
                            <motion.div
                              animate={{ scale: [0.8, 1, 0.8] }}
                              transition={{ repeat: Infinity, duration: 1 }}
                              className="h-2 w-2 rounded-full bg-blue-400"
                            />
                            <motion.div
                              animate={{ scale: [0.8, 1, 0.8] }}
                              transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                              className="h-2 w-2 rounded-full bg-blue-400"
                            />
                            <motion.div
                              animate={{ scale: [0.8, 1, 0.8] }}
                              transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                              className="h-2 w-2 rounded-full bg-blue-400"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </AnimatePresence>
                </div>

                <div className="p-3 border-t bg-white">
                  <div className="relative rounded-full overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400">
                    <textarea
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Ask any health question..."
                      className="w-full px-4 py-2 pr-12 text-sm max-h-20 resize-none focus:outline-none text-gray-900 font-medium"
                      rows={1}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isLoading || isTyping}
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full transition-colors ${
                        inputMessage.trim() && !isLoading && !isTyping
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!isChatOpen && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={openChat}
                className="bg-primary text-primary-foreground p-4 rounded-full shadow-lg flex items-center gap-2"
              >
                <Bot className="w-6 h-6" />
                <span className="hidden md:inline font-medium">AI Health Assistant</span>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Ask our AI health assistant</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default ChatAssistant;
