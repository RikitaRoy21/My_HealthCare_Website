// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Bot, X, Send, ChevronUp, Sparkles, Mic, LanguagesIcon } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { cn } from '@/lib/utils';
// import { healthKnowledgeBase } from '@/lib/healthKnowledgeBase';
// import { useToast } from '@/components/ui/use-toast';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Label } from '@/components/ui/label';


// interface Message {
//   role: 'user' | 'assistant';
//   content: string;
// }

// // Supported languages with numerical options
// const SUPPORTED_LANGUAGES = [
//   { id: 'english', name: 'Option 1: English' },
//   { id: 'bengali', name: 'Option 2: Bengali' },
//   { id: 'hindi', name: 'Option 3: Hindi' }
// ];

// const ChatAssistant = () => {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isMinimized, setIsMinimized] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const [typingText, setTypingText] = useState("");
//   const [fullResponse, setFullResponse] = useState("");
//   const [typingSpeed, setTypingSpeed] = useState(20);
//   const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [isLanguageSelectionComplete, setIsLanguageSelectionComplete] = useState(false);
//   const [isVoiceInputRequired, setIsVoiceInputRequired] = useState(false);
//   const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
//   const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  
//   const chatRef = useRef<HTMLDivElement>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLTextAreaElement>(null);
//   const { toast } = useToast();

//   // Initialize chat with language selection prompt when opened
//   useEffect(() => {
//     if (isChatOpen && messages.length === 0) {
//       setMessages([
//         { 
//           role: 'assistant', 
//           content: "Welcome to Medi Nova!" 
//         }
//       ]);
//     }
//   }, [isChatOpen, messages.length]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, typingText]);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
//         if (isChatOpen && !isMinimized) {
//           setIsMinimized(true);
//         }
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isChatOpen, isMinimized]);

//   // Typing effect simulation
//   useEffect(() => {
//     if (!isTyping || !fullResponse) return;
    
//     let i = 0;
//     const typingInterval = setInterval(() => {
//       if (i < fullResponse.length) {
//         setTypingText(fullResponse.substring(0, i + 1));
//         i++;
//       } else {
//         clearInterval(typingInterval);
//         setIsTyping(false);
//         // Add the full message to the chat history
//         setMessages(prev => [...prev.slice(0, -1), { role: 'assistant', content: fullResponse }]);
//         setFullResponse("");
//         setTypingText("");
        
//         // If language is selected but voice input hasn't been requested yet, prompt for voice input
//         if (isLanguageSelectionComplete && !isVoiceInputRequired) {
//           promptForVoiceInput();
//         }
//       }
//     }, typingSpeed);
    
//     return () => clearInterval(typingInterval);
//   }, [isTyping, fullResponse, typingSpeed, isLanguageSelectionComplete, isVoiceInputRequired]);

//   // Function to handle language selection
//   const handleLanguageSelection = (language: string) => {
//     setSelectedLanguage(language);
//     setIsLanguageSelectionComplete(true);
    
//     // Get the selected language display name
//     const selectedLangObj = SUPPORTED_LANGUAGES.find(lang => lang.id === language);
//     const displayName = selectedLangObj ? selectedLangObj.name : language;
    
//     // Add user message showing language selection
//     setMessages(prev => [...prev, { 
//       role: 'user', 
//       content: `${displayName}` 
//     }]);

//     // Generate appropriate response in selected language
//     let response = "";
    
//     switch(language) {
//       case 'hindi':
//         response = "आपने हिंदी भाषा चुनी है। कृपया अपना प्रश्न पूछने के लिए वॉयस नोट रिकॉर्ड करें।";
//         break;
//       case 'bengali':
//         response = "আপনি বাংলা ভাষা বেছে নিয়েছেন। আপনার প্রশ্ন জিজ্ঞাসা করতে একটি ভয়েস নোট রেকর্ড করুন।";
//         break;
//       default:
//         response = "You've selected English. Please record a voice note to ask your question.";
//     }
    
//     // Add assistant response with voice prompt
//     setMessages(prev => [...prev, { 
//       role: 'assistant', 
//       content: '' 
//     }]);
    
//     setFullResponse(response);
//     setIsTyping(true);
//     setIsVoiceInputRequired(true);
//   };

//   // Function to prompt for voice input
//   const promptForVoiceInput = () => {
//     // This will be called after the language selection message is typed out
//     setIsVoiceInputRequired(true);
//   };

//   // Function to start voice recording
//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const recorder = new MediaRecorder(stream);
//       const audioChunks: BlobPart[] = [];
      
//       recorder.addEventListener('dataavailable', event => {
//         audioChunks.push(event.data);
//       });
      
//       recorder.addEventListener('stop', () => {
//         const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
//         setAudioBlob(audioBlob);
//         processVoiceInput(audioBlob);
        
//         // Stop all tracks
//         stream.getTracks().forEach(track => track.stop());
//       });
      
//       setMediaRecorder(recorder);
//       recorder.start();
//       setIsRecording(true);
      
//       // Show recording toast in appropriate language
//       let toastMessage = "Recording started. Speak your health question now";
//       if (selectedLanguage === 'hindi') {
//         toastMessage = "रिकॉर्डिंग शुरू हुई। अपना स्वास्थ्य प्रश्न बोलें";
//       } else if (selectedLanguage === 'bengali') {
//         toastMessage = "রেকর্ডিং শুরু হয়েছে। আপনার স্বাস্থ্য সম্পর্কিত প্রশ্ন বলুন";
//       }
      
//       toast({
//         title: toastMessage
//       });
//     } catch (error) {
//       console.error("Error accessing microphone:", error);
      
//       // Error message in appropriate language
//       let errorMessage = "Please allow microphone access to use voice features";
//       if (selectedLanguage === 'hindi') {
//         errorMessage = "वॉयस सुविधाओं का उपयोग करने के लिए कृपया माइक्रोफ़ोन एक्सेस की अनुमति दें";
//       } else if (selectedLanguage === 'bengali') {
//         errorMessage = "ভয়েস ফিচার ব্যবহার করতে মাইক্রোফোন অ্যাক্সেস অনুমতি দিন";
//       }
      
//       toast({
//         variant: "destructive",
//         title: "Microphone access denied",
//         description: errorMessage
//       });
//     }
//   };

//   // Function to stop voice recording
//   const stopRecording = () => {
//     if (mediaRecorder && isRecording) {
//       mediaRecorder.stop();
//       setIsRecording(false);
      
//       // Show processing toast in appropriate language
//       let toastMessage = "Processing your question...";
//       if (selectedLanguage === 'hindi') {
//         toastMessage = "आपके प्रश्न को प्रोसेस किया जा रहा है...";
//       } else if (selectedLanguage === 'bengali') {
//         toastMessage = "আপনার প্রশ্ন প্রক্রিয়া করা হচ্ছে...";
//       }
      
//       toast({
//         title: "Recording stopped",
//         description: toastMessage
//       });
//     }
//   };

//   // Function to process voice input (simulate speech-to-text)
//   const processVoiceInput = async (blob: Blob) => {
//     setIsLoading(true);
    
//     // Simulate a voice transcription process
//     setTimeout(() => {
//       // Simulate transcribed text based on selected language
//       let transcribedText = "";
      
//       switch(selectedLanguage) {
//         case 'hindi':
//           transcribedText = "मुझे सिरदर्द हो रहा है, क्या मुझे कोई दवा लेनी चाहिए?";
//           break;
//         case 'bengali':
//           transcribedText = "আমার মাথা ব্যথা করছে, আমি কি কোন ওষুধ খাব?";
//           break;
//         default:
//           transcribedText = "I have a headache, should I take any medication?";
//       }
      
//       // Add transcribed voice input as user message
//       setMessages(prev => [...prev, { 
//         role: 'user', 
//         content: transcribedText 
//       }]);
      
//       // Generate response to the voice input
//       const response = generateLocalizedResponse(transcribedText);
      
//       setIsLoading(false);
//       setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
//       setFullResponse(response);
//       setIsTyping(true);
//       setIsVoiceInputRequired(false); // Reset for next question
//     }, 2000);
//   };

//   // Enhanced AI response generation with language localization
//   const generateLocalizedResponse = (userQuery: string) => {
//     // Basic responses in different languages
//     if (selectedLanguage === 'hindi') {
//       return `आपके प्रश्न "${userQuery}" के लिए धन्यवाद।

// सिरदर्द एक आम समस्या है और इसके कई कारण हो सकते हैं जैसे तनाव, थकान, नींद की कमी, या डिहाइड्रेशन।

// कुछ सुझाव:
// • पर्याप्त पानी पीएं
// • थोड़ी देर आराम करें
// • यदि आवश्यक हो तो पेरासिटामॉल या आइबुप्रोफेन जैसी दर्द निवारक दवा लें
// • यदि सिरदर्द गंभीर है या बार-बार होता है, तो डॉक्टर से परामर्श करें

// क्या आपके पास इस बारे में कोई अन्य प्रश्न है?`;
//     } 
//     else if (selectedLanguage === 'bengali') {
//       return `আপনার প্রশ্ন "${userQuery}" এর জন্য ধন্যবাদ।

// মাথাব্যথা একটি সাধারণ সমস্যা এবং এর বিভিন্ন কারণ থাকতে পারে যেমন স্ট্রেস, ক্লান্তি, ঘুমের অভাব বা ডিহাইড্রেশন।

// কিছু পরামর্শ:
// • প্রচুর পানি পান করুন
// • কিছুক্ষণ বিশ্রাম নিন
// • প্রয়োজনে প্যারাসিটামল বা আইবুপ্রোফেন জাতীয় ব্যথানাশক ওষুধ খান
// • যদি মাথাব্যথা তীব্র হয় বা বারবার হয়, তাহলে ডাক্তারের পরামর্শ নিন

// এই বিষয়ে আপনার আরও কোন প্রশ্ন আছে?`;
//     } 
//     else {
//       return `Thank you for your question: "${userQuery}"

// Headaches are a common issue and can have various causes like stress, fatigue, lack of sleep, or dehydration.

// Some suggestions:
// • Drink plenty of water
// • Rest for a while
// • Take pain relievers like paracetamol or ibuprofen if needed
// • If the headache is severe or recurring, consult a doctor

// Do you have any other questions about this?`;
//     }
//   };

//   const generateResponse = (userQuery: string) => {
//     return generateLocalizedResponse(userQuery);
//   };

//   const handleSendMessage = async () => {
//     if (!inputMessage.trim()) return;

//     const userMessage = inputMessage.trim();
//     setInputMessage('');
//     setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
//     setIsLoading(true);

//     // Focus back on input after sending
//     inputRef.current?.focus();

//     setTimeout(() => {
//       const response = generateResponse(userMessage);
//       setIsLoading(false);
      
//       setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
//       setFullResponse(response);
//       setIsTyping(true);
//     }, 1000);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const openChat = () => {
//     setIsChatOpen(true);
//     setIsMinimized(false);
//     setTimeout(() => {
//       inputRef.current?.focus();
//     }, 100);
//   };

//   // Render language selection options with clearer numbering
//   const renderLanguageSelection = () => {
//     return (
//       <div className="p-4 flex flex-col space-y-4">
//         <p className="text-sm text-gray-800 mb-2">Please choose the language you are comfortable with:</p>
//         <RadioGroup 
//           value={selectedLanguage || ''} 
//           onValueChange={handleLanguageSelection}
//           className="space-y-3"
//         >
//           {SUPPORTED_LANGUAGES.map(language => (
//             <div key={language.id} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md transition-colors">
//               <RadioGroupItem value={language.id} id={language.id} />
//               <Label htmlFor={language.id} className="cursor-pointer font-medium text-gray-900">
//                 {language.name}
//               </Label>
//             </div>
//           ))}
//         </RadioGroup>
//       </div>
//     );
//   };

//   return (
//     <div className="fixed bottom-5 right-5 z-50" ref={chatRef}>
//       <AnimatePresence>
//         {isChatOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 20, scale: 0.95 }}
//             animate={{ 
//               opacity: 1, 
//               y: 0, 
//               scale: 1,
//               height: isMinimized ? 'auto' : 480,
//             }}
//             exit={{ opacity: 0, y: 20, scale: 0.95 }}
//             transition={{ type: 'spring', stiffness: 500, damping: 30 }}
//             className={cn(
//               "bg-white rounded-2xl shadow-2xl w-[340px] overflow-hidden flex flex-col",
//               isMinimized ? "h-auto" : "h-[480px]"
//             )}
//           >
//             <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white">
//               <div className="flex items-center gap-2">
//                 <Avatar className="h-8 w-8 border-2 border-white/20">
//                   <AvatarImage src="/mediNova-logo.png" alt="Bot" />
//                   <AvatarFallback className="bg-blue-800 text-white">MN</AvatarFallback>
//                 </Avatar>
//                 <div className="flex flex-col">
//                   <span className="font-medium">Medi Nova AI</span>
//                   <span className="text-xs text-white/90 flex items-center">
//                     <Sparkles className="w-3 h-3 mr-1" />
//                     Powered by OpenAI
//                   </span>
//                 </div>
//               </div>
//               <div className="flex items-center gap-1">
//                 <Button 
//                   onClick={() => setIsMinimized(!isMinimized)}
//                   size="icon"
//                   variant="ghost"
//                   className="h-8 w-8 text-white hover:bg-white/10"
//                 >
//                   <ChevronUp className={`h-5 w-5 transition-transform ${isMinimized ? 'rotate-180' : ''}`} />
//                 </Button>
//                 <Button 
//                   onClick={() => setIsChatOpen(false)}
//                   size="icon"
//                   variant="ghost"
//                   className="h-8 w-8 text-white hover:bg-white/10"
//                 >
//                   <X className="h-5 w-5" />
//                 </Button>
//               </div>
//             </div>
            
//             {!isMinimized && (
//               <>
//                 <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
//                   <AnimatePresence initial={false}>
//                     {messages.map((message, index) => (
//                       <motion.div
//                         key={index}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className={`flex items-start gap-2 mb-4 ${
//                           message.role === 'user' ? 'flex-row-reverse' : ''
//                         }`}
//                       >
//                         {message.role === 'assistant' && (
//                           <Avatar className="h-8 w-8 mt-1">
//                             <AvatarImage src="/mediNova-logo.png" alt="Bot" />
//                             <AvatarFallback className="bg-blue-600 text-white">MN</AvatarFallback>
//                           </Avatar>
//                         )}
//                         {message.role === 'user' && (
//                           <Avatar className="h-8 w-8 mt-1">
//                             <AvatarImage src="/placeholder.svg" alt="You" />
//                             <AvatarFallback className="bg-gray-200 text-gray-700">You</AvatarFallback>
//                           </Avatar>
//                         )}
//                         <motion.div
//                           initial={{ scale: 0.95 }}
//                           animate={{ scale: 1 }}
//                           className={`rounded-lg p-3 text-sm max-w-[230px] ${
//                             message.role === 'user'
//                               ? 'bg-blue-600 text-white font-medium'
//                               : 'bg-white text-gray-900 border border-gray-200 shadow-sm font-medium'
//                           }`}
//                         >
//                           <p className="whitespace-pre-line">{
//                             isTyping && index === messages.length - 1 ? typingText : message.content
//                           }</p>
//                         </motion.div>
//                       </motion.div>
//                     ))}
//                     {isLoading && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="flex items-start gap-2 mb-4"
//                       >
//                         <Avatar className="h-8 w-8 mt-1">
//                           <AvatarImage src="/mediNova-logo.png" alt="Bot" />
//                           <AvatarFallback className="bg-blue-600 text-white">MN</AvatarFallback>
//                         </Avatar>
//                         <div className="bg-white rounded-lg p-3 text-gray-900 border border-gray-200 shadow-sm">
//                           <div className="flex space-x-1">
//                             <motion.div
//                               animate={{ scale: [0.8, 1, 0.8] }}
//                               transition={{ repeat: Infinity, duration: 1 }}
//                               className="h-2 w-2 rounded-full bg-blue-400"
//                             />
//                             <motion.div
//                               animate={{ scale: [0.8, 1, 0.8] }}
//                               transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
//                               className="h-2 w-2 rounded-full bg-blue-400"
//                             />
//                             <motion.div
//                               animate={{ scale: [0.8, 1, 0.8] }}
//                               transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
//                               className="h-2 w-2 rounded-full bg-blue-400"
//                             />
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}
//                     <div ref={messagesEndRef} />
//                   </AnimatePresence>
//                 </div>

//                 <div className="p-3 border-t bg-white">
//                   {!isLanguageSelectionComplete && renderLanguageSelection()}
                  
//                   {isLanguageSelectionComplete && (
//                     <div className="flex items-center space-x-2">
//                       {isVoiceInputRequired && (
//                         <Button
//                           onClick={isRecording ? stopRecording : startRecording}
//                           className={cn(
//                             "rounded-full flex-shrink-0",
//                             isRecording ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"
//                           )}
//                         >
//                           <Mic className="w-5 h-5 mr-1" />
//                           {isRecording ? "Stop" : "Speak"}
//                         </Button>
//                       )}
//                       <div className="relative rounded-full overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400 flex-grow">
//                         <textarea
//                           ref={inputRef}
//                           value={inputMessage}
//                           onChange={(e) => setInputMessage(e.target.value)}
//                           onKeyDown={handleKeyPress}
//                           placeholder={isVoiceInputRequired ? "Or type your question..." : "Ask any health question..."}
//                           className="w-full px-4 py-2 pr-12 text-sm max-h-20 resize-none focus:outline-none text-gray-900 font-medium"
//                           rows={1}
//                         />
//                         <button
//                           onClick={handleSendMessage}
//                           disabled={!inputMessage.trim() || isLoading || isTyping}
//                           className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full transition-colors ${
//                             inputMessage.trim() && !isLoading && !isTyping
//                               ? 'bg-blue-600 text-white hover:bg-blue-700'
//                               : 'bg-gray-200 text-gray-500'
//                           }`}
//                         >
//                           <Send className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {!isChatOpen && (
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <motion.button
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={openChat}
//                 className="bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center gap-2"
//               >
//                 <Bot className="w-6 h-6" />
//                 <LanguagesIcon className="w-5 h-5" />
//                 <span className="hidden md:inline font-medium">Multilingual Health Assistant</span>
//               </motion.button>
//             </TooltipTrigger>
//             <TooltipContent side="left">
//               <p className="text-gray-900">Ask our Multilingual AI health assistant</p>
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
//       )}
//     </div>
//   );
// };

// export default ChatAssistant;



// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Bot, X, Send, ChevronUp, Sparkles, Mic, LanguagesIcon } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { cn } from '@/lib/utils';
// import { healthKnowledgeBase } from '@/lib/healthKnowledgeBase';
// import { useToast } from '@/components/ui/use-toast';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Label } from '@/components/ui/label';


// interface Message {
//   role: 'user' | 'assistant';
//   content: string;
// }

// // Supported languages with numerical options
// const SUPPORTED_LANGUAGES = [
//   { id: 'english', name: 'Option 1: English' },
//   { id: 'bengali', name: 'Option 2: Bengali' },
//   { id: 'hindi', name: 'Option 3: Hindi' }
// ];

// const ChatAssistant = () => {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isMinimized, setIsMinimized] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const [typingText, setTypingText] = useState("");
//   const [fullResponse, setFullResponse] = useState("");
//   const [typingSpeed, setTypingSpeed] = useState(20);
//   const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [isLanguageSelectionComplete, setIsLanguageSelectionComplete] = useState(false);
//   const [isVoiceInputRequired, setIsVoiceInputRequired] = useState(false);
//   const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
//   const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  
//   const chatRef = useRef<HTMLDivElement>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLTextAreaElement>(null);
//   const { toast } = useToast();

//   // Initialize chat with language selection prompt when opened
//   useEffect(() => {
//     if (isChatOpen && messages.length === 0) {
//       setMessages([
//         { 
//           role: 'assistant', 
//           content: "Welcome to MediNova Assistant! Please choose the language you are comfortable with:" 
//         }
//       ]);
//     }
//   }, [isChatOpen, messages.length]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, typingText]);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
//         if (isChatOpen && !isMinimized) {
//           setIsMinimized(true);
//         }
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isChatOpen, isMinimized]);

//   // Typing effect simulation
//   useEffect(() => {
//     if (!isTyping || !fullResponse) return;
    
//     let i = 0;
//     const typingInterval = setInterval(() => {
//       if (i < fullResponse.length) {
//         setTypingText(fullResponse.substring(0, i + 1));
//         i++;
//       } else {
//         clearInterval(typingInterval);
//         setIsTyping(false);
//         // Add the full message to the chat history
//         setMessages(prev => [...prev.slice(0, -1), { role: 'assistant', content: fullResponse }]);
//         setFullResponse("");
//         setTypingText("");
        
//         // If language is selected but voice input hasn't been requested yet, prompt for voice input
//         if (isLanguageSelectionComplete && !isVoiceInputRequired) {
//           promptForVoiceInput();
//         }
//       }
//     }, typingSpeed);
    
//     return () => clearInterval(typingInterval);
//   }, [isTyping, fullResponse, typingSpeed, isLanguageSelectionComplete, isVoiceInputRequired]);

//   // Function to handle language selection
//   const handleLanguageSelection = (language: string) => {
//     setSelectedLanguage(language);
//     setIsLanguageSelectionComplete(true);
    
//     // Get the selected language display name
//     const selectedLangObj = SUPPORTED_LANGUAGES.find(lang => lang.id === language);
//     const displayName = selectedLangObj ? selectedLangObj.name : language;
    
//     // Add user message showing language selection
//     setMessages(prev => [...prev, { 
//       role: 'user', 
//       content: `${displayName}` 
//     }];

//     // Generate appropriate response in selected language
//     let response = "";
    
//     switch(language) {
//       case 'hindi':
//         response = "आपने हिंदी भाषा चुनी है। कृपया अपना प्रश्न पूछने के लिए वॉयस नोट रिकॉर्ड करें।";
//         break;
//       case 'bengali':
//         response = "আপনি বাংলা ভাষা বেছে নিয়েছেন। আপনার প্রশ্ন জিজ্ঞাসা করতে একটি ভয়েস নোট রেকর্ড করুন।";
//         break;
//       default:
//         response = "You've selected English. Please record a voice note to ask your question.";
//     }
    
//     // Add assistant response with voice prompt
//     setMessages(prev => [...prev, { 
//       role: 'assistant', 
//       content: '' 
//     }]);
    
//     setFullResponse(response);
//     setIsTyping(true);
//     setIsVoiceInputRequired(true);
//   };

//   // Function to prompt for voice input
//   const promptForVoiceInput = () => {
//     // This will be called after the language selection message is typed out
//     setIsVoiceInputRequired(true);
//   };

//   // Function to start voice recording
//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const recorder = new MediaRecorder(stream);
//       const audioChunks: BlobPart[] = [];
      
//       recorder.addEventListener('dataavailable', event => {
//         audioChunks.push(event.data);
//       });
      
//       recorder.addEventListener('stop', () => {
//         const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
//         setAudioBlob(audioBlob);
//         processVoiceInput(audioBlob);
        
//         // Stop all tracks
//         stream.getTracks().forEach(track => track.stop());
//       });
      
//       setMediaRecorder(recorder);
//       recorder.start();
//       setIsRecording(true);
      
//       // Show recording toast in appropriate language
//       let toastMessage = "Recording started. Speak your health question now";
//       if (selectedLanguage === 'hindi') {
//         toastMessage = "रिकॉर्डिंग शुरू हुई। अपना स्वास्थ्य प्रश्न बोलें";
//       } else if (selectedLanguage === 'bengali') {
//         toastMessage = "রেকর্ডিং শুরু হয়েছে। আপনার স্বাস্থ্য সম্পর্কিত প্রশ্ন বলুন";
//       }
      
//       toast({
//         title: toastMessage
//       });
//     } catch (error) {
//       console.error("Error accessing microphone:", error);
      
//       // Error message in appropriate language
//       let errorMessage = "Please allow microphone access to use voice features";
//       if (selectedLanguage === 'hindi') {
//         errorMessage = "वॉयस सुविधाओं का उपयोग करने के लिए कृपया माइक्रोफ़ोन एक्सेस की अनुमति दें";
//       } else if (selectedLanguage === 'bengali') {
//         errorMessage = "ভয়েস ফিচার ব্যবহার করতে মাইক্রোফোন অ্যাক্সেস অনুমতি দিন";
//       }
      
//       toast({
//         variant: "destructive",
//         title: "Microphone access denied",
//         description: errorMessage
//       });
//     }
//   };

//   // Function to stop voice recording
//   const stopRecording = () => {
//     if (mediaRecorder && isRecording) {
//       mediaRecorder.stop();
//       setIsRecording(false);
      
//       // Show processing toast in appropriate language
//       let toastMessage = "Processing your question...";
//       if (selectedLanguage === 'hindi') {
//         toastMessage = "आपके प्रश्न को प्रोसेस किया जा रहा है...";
//       } else if (selectedLanguage === 'bengali') {
//         toastMessage = "আপনার প্রশ্ন প্রক্রিয়া করা হচ্ছে...";
//       }
      
//       toast({
//         title: "Recording stopped",
//         description: toastMessage
//       });
//     }
//   };

//   // Function to process voice input (simulate speech-to-text)
//   const processVoiceInput = async (blob: Blob) => {
//     setIsLoading(true);
    
//     // Simulate a voice transcription process
//     setTimeout(() => {
//       // Simulate transcribed text based on selected language
//       let transcribedText = "";
      
//       switch(selectedLanguage) {
//         case 'hindi':
//           transcribedText = "मुझे सिरदर्द हो रहा है, क्या मुझे कोई दवा लेनी चाहिए?";
//           break;
//         case 'bengali':
//           transcribedText = "আমার মাথা ব্যথা করছে, আমি কি কোন ওষুধ খাব?";
//           break;
//         default:
//           transcribedText = "I have a headache, should I take any medication?";
//       }
      
//       // Add transcribed voice input as user message
//       setMessages(prev => [...prev, { 
//         role: 'user', 
//         content: transcribedText 
//       }]);
      
//       // Generate response to the voice input
//       const response = generateLocalizedResponse(transcribedText);
      
//       setIsLoading(false);
//       setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
//       setFullResponse(response);
//       setIsTyping(true);
//       setIsVoiceInputRequired(false); // Reset for next question
//     }, 2000);
//   };

//   // Enhanced AI response generation with language localization
//   const generateLocalizedResponse = (userQuery: string) => {
//     // Basic responses in different languages
//     if (selectedLanguage === 'hindi') {
//       return `आपके प्रश्न "${userQuery}" के लिए धन्यवाद।

// सिरदर्द एक आम समस्या है और इसके कई कारण हो सकते हैं जैसे तनाव, थकान, नींद की कमी, या डिहाइड्रेशन।

// कुछ सुझाव:
// • पर्याप्त पानी पीएं
// • थोड़ी देर आराम करें
// • यदि आवश्यक हो तो पेरासिटामॉल या आइबुप्रोफेन जैसी दर्द निवारक दवा लें
// • यदि सिरदर्द गंभीर है या बार-बार होता है, तो डॉक्टर से परामर्श करें

// क्या आपके पास इस बारे में कोई अन्य प्रश्न है?`;
//     } 
//     else if (selectedLanguage === 'bengali') {
//       return `আপনার প্রশ্ন "${userQuery}" এর জন্য ধন্যবাদ।

// মাথাব্যথা একটি সাধারণ সমস্যা এবং এর বিভিন্ন কারণ থাকতে পারে যেমন স্ট্রেস, ক্লান্তি, ঘুমের অভাব বা ডিহাইড্রেশন।

// কিছু পরামর্শ:
// • প্রচুর পানি পান করুন
// • কিছুক্ষণ বিশ্রাম নিন
// • প্রয়োজনে প্যারাসিটামল বা আইবুপ্রোফেন জাতীয় ব্যথানাশক ওষুধ খান
// • যদি মাথাব্যথা তীব্র হয় বা বারবার হয়, তাহলে ডাক্তারের পরামর্শ নিন

// এই বিষয়ে আপনার আরও কোন প্রশ্ন আছে?`;
//     } 
//     else {
//       return `Thank you for your question: "${userQuery}"

// Headaches are a common issue and can have various causes like stress, fatigue, lack of sleep, or dehydration.

// Some suggestions:
// • Drink plenty of water
// • Rest for a while
// • Take pain relievers like paracetamol or ibuprofen if needed
// • If the headache is severe or recurring, consult a doctor

// Do you have any other questions about this?`;
//     }
//   };

//   const generateResponse = (userQuery: string) => {
//     return generateLocalizedResponse(userQuery);
//   };

//   const handleSendMessage = async () => {
//     if (!inputMessage.trim()) return;

//     const userMessage = inputMessage.trim();
//     setInputMessage('');
//     setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
//     setIsLoading(true);

//     // Focus back on input after sending
//     inputRef.current?.focus();

//     setTimeout(() => {
//       const response = generateResponse(userMessage);
//       setIsLoading(false);
      
//       setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
//       setFullResponse(response);
//       setIsTyping(true);
//     }, 1000);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const openChat = () => {
//     setIsChatOpen(true);
//     setIsMinimized(false);
//     setTimeout(() => {
//       inputRef.current?.focus();
//     }, 100);
//   };

//   // Render language selection options with clearer numbering
//   const renderLanguageSelection = () => {
//     return (
//       <div className="p-4 flex flex-col space-y-4">
//         <p className="text-sm text-gray-800 mb-2">Please choose the language you are comfortable with:</p>
//         <RadioGroup 
//           value={selectedLanguage || ''} 
//           onValueChange={handleLanguageSelection}
//           className="space-y-3"
//         >
//           {SUPPORTED_LANGUAGES.map(language => (
//             <div key={language.id} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md transition-colors">
//               <RadioGroupItem value={language.id} id={language.id} />
//               <Label htmlFor={language.id} className="cursor-pointer font-medium text-gray-900">
//                 {language.name}
//               </Label>
//             </div>
//           ))}
//         </RadioGroup>
//       </div>
//     );
//   };

//   return (
//     <div className="fixed bottom-5 right-5 z-50" ref={chatRef}>
//       <AnimatePresence>
//         {isChatOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 20, scale: 0.95 }}
//             animate={{ 
//               opacity: 1, 
//               y: 0, 
//               scale: 1,
//               height: isMinimized ? 'auto' : 480,
//             }}
//             exit={{ opacity: 0, y: 20, scale: 0.95 }}
//             transition={{ type: 'spring', stiffness: 500, damping: 30 }}
//             className={cn(
//               "bg-white rounded-2xl shadow-2xl w-[340px] overflow-hidden flex flex-col",
//               isMinimized ? "h-auto" : "h-[480px]"
//             )}
//           >
//             <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white">
//               <div className="flex items-center gap-2">
//                 <Avatar className="h-8 w-8 border-2 border-white/20">
//                   <AvatarImage src="/mediNova-logo.png" alt="Bot" />
//                   <AvatarFallback className="bg-blue-800 text-white">MN</AvatarFallback>
//                 </Avatar>
//                 <div className="flex flex-col">
//                   <span className="font-medium">MediNova Assistant</span>
//                   <span className="text-xs text-white/90 flex items-center">
//                     <Sparkles className="w-3 h-3 mr-1" />
//                     AI Health Assistant
//                   </span>
//                 </div>
//               </div>
//               <div className="flex items-center gap-1">
//                 <Button 
//                   onClick={() => setIsMinimized(!isMinimized)}
//                   size="icon"
//                   variant="ghost"
//                   className="h-8 w-8 text-white hover:bg-white/10"
//                 >
//                   <ChevronUp className={`h-5 w-5 transition-transform ${isMinimized ? 'rotate-180' : ''}`} />
//                 </Button>
//                 <Button 
//                   onClick={() => setIsChatOpen(false)}
//                   size="icon"
//                   variant="ghost"
//                   className="h-8 w-8 text-white hover:bg-white/10"
//                 >
//                   <X className="h-5 w-5" />
//                 </Button>
//               </div>
//             </div>
            
//             {!isMinimized && (
//               <>
//                 <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
//                   <AnimatePresence initial={false}>
//                     {messages.map((message, index) => (
//                       <motion.div
//                         key={index}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className={`flex items-start gap-2 mb-4 ${
//                           message.role === 'user' ? 'flex-row-reverse' : ''
//                         }`}
//                       >
//                         {message.role === 'assistant' && (
//                           <Avatar className="h-8 w-8 mt-1">
//                             <AvatarImage src="/mediNova-logo.png" alt="Bot" />
//                             <AvatarFallback className="bg-blue-600 text-white">MN</AvatarFallback>
//                           </Avatar>
//                         )}
//                         {message.role === 'user' && (
//                           <Avatar className="h-8 w-8 mt-1">
//                             <AvatarImage src="/placeholder.svg" alt="You" />
//                             <AvatarFallback className="bg-gray-200 text-gray-700">You</AvatarFallback>
//                           </Avatar>
//                         )}
//                         <motion.div
//                           initial={{ scale: 0.95 }}
//                           animate={{ scale: 1 }}
//                           className={`rounded-lg p-3 text-sm max-w-[230px] ${
//                             message.role === 'user'
//                               ? 'bg-blue-600 text-white font-medium'
//                               : 'bg-white text-gray-900 border border-gray-200 shadow-sm font-medium'
//                           }`}
//                         >
//                           <p className="whitespace-pre-line">{
//                             isTyping && index === messages.length - 1 ? typingText : message.content
//                           }</p>
//                         </motion.div>
//                       </motion.div>
//                     ))}
//                     {isLoading && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="flex items-start gap-2 mb-4"
//                       >
//                         <Avatar className="h-8 w-8 mt-1">
//                           <AvatarImage src="/mediNova-logo.png" alt="Bot" />
//                           <AvatarFallback className="bg-blue-600 text-white">MN</AvatarFallback>
//                         </Avatar>
//                         <div className="bg-white rounded-lg p-3 text-gray-900 border border-gray-200 shadow-sm">
//                           <div className="flex space-x-1">
//                             <motion.div
//                               animate={{ scale: [0.8, 1, 0.8] }}
//                               transition={{ repeat: Infinity, duration: 1 }}
//                               className="h-2 w-2 rounded-full bg-blue-400"
//                             />
//                             <motion.div
//                               animate={{ scale: [0.8, 1, 0.8] }}
//                               transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
//                               className="h-2 w-2 rounded-full bg-blue-400"
//                             />
//                             <motion.div
//                               animate={{ scale: [0.8, 1, 0.8] }}
//                               transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
//                               className="h-2 w-2 rounded-full bg-blue-400"
//                             />
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}
//                     <div ref={messagesEndRef} />
//                   </AnimatePresence>
//                 </div>

//                 <div className="p-3 border-t bg-white">
//                   {!isLanguageSelectionComplete && renderLanguageSelection()}
                  
//                   {isLanguageSelectionComplete && (
//                     <div className="flex items-center space-x-2">
//                       {isVoiceInputRequired && (
//                         <Button
//                           onClick={isRecording ? stopRecording : startRecording}
//                           className={cn(
//                             "rounded-full flex-shrink-0",
//                             isRecording ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"
//                           )}
//                         >
//                           <Mic className="w-5 h-5 mr-1" />
//                           {isRecording ? "Stop" : "Speak"}
//                         </Button>
//                       )}
//                       <div className="relative rounded-full overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400 flex-grow">
//                         <textarea
//                           ref={inputRef}
//                           value={inputMessage}
//                           onChange={(e) => setInputMessage(e.target.value)}
//                           onKeyDown={handleKeyPress}
//                           placeholder={isVoiceInputRequired ? "Or type your question..." : "Ask any health question..."}
//                           className="w-full px-4 py-2 pr-12 text-sm max-h-20 resize-none focus:outline-none text-gray-900 font-medium"
//                           rows={1}
//                         />
//                         <button
//                           onClick={handleSendMessage}
//                           disabled={!inputMessage.trim() || isLoading || isTyping}
//                           className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full transition-colors ${
//                             inputMessage.trim() && !isLoading && !isTyping
//                               ? 'bg-blue-600 text-white hover:bg-blue-700'
//                               : 'bg-gray-200 text-gray-500'
//                           }`}
//                         >
//                           <Send className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {!isChatOpen && (
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <motion.button
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={openChat}
//                 className="bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center gap-2"
//               >
//                 <Bot className="w-6 h-6" />
//                 <LanguagesIcon className="w-5 h-5" />
//                 <span className="hidden md:inline font-medium">MediNova Assistant</span>
//               </motion.button>
//             </TooltipTrigger>
//             <TooltipContent side="left">
//               <p className="text-gray-900">Ask MediNova Assistant</p>
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
//       )}
//     </div>
//   );
// };

// export default ChatAssistant;



import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, ChevronUp, Sparkles, Mic, LanguagesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { healthKnowledgeBase } from '@/lib/healthKnowledgeBase';
import { useToast } from '@/components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Supported languages with numerical options
const SUPPORTED_LANGUAGES = [
  { id: 'english', name: 'Option 1: English' },
  { id: 'bengali', name: 'Option 2: Bengali' },
  { id: 'hindi', name: 'Option 3: Hindi' }
];

const ChatAssistant = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [fullResponse, setFullResponse] = useState("");
  const [typingSpeed, setTypingSpeed] = useState(20);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isLanguageSelectionComplete, setIsLanguageSelectionComplete] = useState(false);
  const [isVoiceInputRequired, setIsVoiceInputRequired] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Initialize chat with language selection prompt when opened
  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      setMessages([
        { 
          role: 'assistant', 
          content: "Welcome to MediNova Assistant! Please choose the language you are comfortable with:" 
        }
      ]);
    }
  }, [isChatOpen, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingText]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
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
        setMessages(prev => [...prev.slice(0, -1), { role: 'assistant', content: fullResponse }]);
        setFullResponse("");
        setTypingText("");
        
        if (isLanguageSelectionComplete && !isVoiceInputRequired) {
          promptForVoiceInput();
        }
      }
    }, typingSpeed);
    
    return () => clearInterval(typingInterval);
  }, [isTyping, fullResponse, typingSpeed, isLanguageSelectionComplete, isVoiceInputRequired]);

  // Function to handle language selection
  const handleLanguageSelection = (language: string) => {
    setSelectedLanguage(language);
    setIsLanguageSelectionComplete(true);
    
    // Get the selected language display name
    const selectedLangObj = SUPPORTED_LANGUAGES.find(lang => lang.id === language);
    const displayName = selectedLangObj ? selectedLangObj.name : language;
    
    // Add user message showing language selection
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: `${displayName}` 
    }]);

    // Generate appropriate response in selected language
    let response = "";
    
    switch(language) {
      case 'hindi':
        response = "आपने हिंदी भाषा चुनी है। कृपया अपना प्रश्न पूछने के लिए वॉयस नोट रिकॉर्ड करें।";
        break;
      case 'bengali':
        response = "আপনি বাংলা ভাষা বেছে নিয়েছেন। আপনার প্রশ্ন জিজ্ঞাসা করতে একটি ভয়েস নোট রেকর্ড করুন।";
        break;
      default:
        response = "You've selected English. Please record a voice note to ask your question.";
    }
    
    // Add assistant response with voice prompt
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: '' 
    }]);
    
    setFullResponse(response);
    setIsTyping(true);
    setIsVoiceInputRequired(true);
  };

  // Function to prompt for voice input
  const promptForVoiceInput = () => {
    setIsVoiceInputRequired(true);
  };

  // Function to start voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];
      
      recorder.addEventListener('dataavailable', event => {
        audioChunks.push(event.data);
      });
      
      recorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        processVoiceInput(audioBlob);
        
        stream.getTracks().forEach(track => track.stop());
      });
      
      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
      
      let toastMessage = "Recording started. Speak your health question now";
      if (selectedLanguage === 'hindi') {
        toastMessage = "रिकॉर्डिंग शुरू हुई। अपना स्वास्थ्य प्रश्न बोलें";
      } else if (selectedLanguage === 'bengali') {
        toastMessage = "রেকর্ডিং শুরু হয়েছে। আপনার স্বাস্থ্য সম্পর্কিত প্রশ্ন বলুন";
      }
      
      toast({
        title: toastMessage
      });
    } catch (error) {
      console.error("Error accessing microphone:", error);
      
      let errorMessage = "Please allow microphone access to use voice features";
      if (selectedLanguage === 'hindi') {
        errorMessage = "वॉयस सुविधाओं का उपयोग करने के लिए कृपया माइक्रोफ़ोन एक्सेस की अनुमति दें";
      } else if (selectedLanguage === 'bengali') {
        errorMessage = "ভয়েস ফিচার ব্যবহার করতে মাইক্রোফোন অ্যাক্সেস অনুমতি দিন";
      }
      
      toast({
        variant: "destructive",
        title: "Microphone access denied",
        description: errorMessage
      });
    }
  };

  // Function to stop voice recording
  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      
      let toastMessage = "Processing your question...";
      if (selectedLanguage === 'hindi') {
        toastMessage = "आपके प्रश्न को प्रोसेस किया जा रहा है...";
      } else if (selectedLanguage === 'bengali') {
        toastMessage = "আপনার প্রশ্ন প্রক্রিয়া করা হচ্ছে...";
      }
      
      toast({
        title: "Recording stopped",
        description: toastMessage
      });
    }
  };

  // Function to process voice input (simulate speech-to-text)
  const processVoiceInput = async (blob: Blob) => {
    setIsLoading(true);
    
    setTimeout(() => {
      let transcribedText = "";
      
      switch(selectedLanguage) {
        case 'hindi':
          transcribedText = "मुझे सिरदर्द हो रहा है, क्या मुझे कोई दवा लेनी चाहिए?";
          break;
        case 'bengali':
          transcribedText = "আমার মাথা ব্যথা করছে, আমি কি কোন ওষুধ খাব?";
          break;
        default:
          transcribedText = "I have a headache, should I take any medication?";
      }
      
      setMessages(prev => [...prev, { 
        role: 'user', 
        content: transcribedText 
      }]);
      
      const response = generateLocalizedResponse(transcribedText);
      
      setIsLoading(false);
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      setFullResponse(response);
      setIsTyping(true);
      setIsVoiceInputRequired(false);
    }, 2000);
  };

  // Enhanced AI response generation with language localization
  const generateLocalizedResponse = (userQuery: string) => {
    if (selectedLanguage === 'hindi') {
      return `आपके प्रश्न "${userQuery}" के लिए धन्यवाद।

सिरदर्द एक आम समस्या है और इसके कई कारण हो सकते हैं जैसे तनाव, थकान, नींद की कमी, या डिहाइड्रेशन।

कुछ सुझाव:
• पर्याप्त पानी पीएं
• थोड़ी देर आराम करें
• यदि आवश्यक हो तो पेरासिटामॉल या आइबुप्रोफेन जैसी दर्द निवारक दवा लें
• यदि सिरदर्द गंभीर है या बार-बार होता है, तो डॉक्टर से परामर्श करें

क्या आपके पास इस बारे में कोई अन्य प्रश्न है?`;
    } 
    else if (selectedLanguage === 'bengali') {
      return `আপনার প্রশ্ন "${userQuery}" এর জন্য ধন্যবাদ।

মাথাব্যথা একটি সাধারণ সমস্যা এবং এর বিভিন্ন কারণ থাকতে পারে যেমন স্ট্রেস, ক্লান্তি, ঘুমের অভাব বা ডিহাইড্রেশন।

কিছু পরামর্শ:
• প্রচুর পানি পান করুন
• কিছুক্ষণ বিশ্রাম নিন
• প্রয়োজনে প্যারাসিটামল বা আইবুপ্রোফেন জাতীয় ব্যথানাশক ওষুধ খান
• যদি মাথাব্যথা তীব্র হয় বা বারবার হয়, তাহলে ডাক্তারের পরামর্শ নিন

এই বিষয়ে আপনার আরও কোন প্রশ্ন আছে?`;
    } 
    else {
      return `Thank you for your question: "${userQuery}"

Headaches are a common issue and can have various causes like stress, fatigue, lack of sleep, or dehydration.

Some suggestions:
• Drink plenty of water
• Rest for a while
• Take pain relievers like paracetamol or ibuprofen if needed
• If the headache is severe or recurring, consult a doctor

Do you have any other questions about this?`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    inputRef.current?.focus();

    setTimeout(() => {
      const response = generateLocalizedResponse(userMessage);
      setIsLoading(false);
      
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

  // Render language selection options with clearer numbering
  const renderLanguageSelection = () => {
    return (
      <div className="p-4 flex flex-col space-y-4">
        <p className="text-sm text-gray-800 mb-2">Please choose the language you are comfortable with:</p>
        <RadioGroup 
          value={selectedLanguage || ''} 
          onValueChange={handleLanguageSelection}
          className="space-y-3"
        >
          {SUPPORTED_LANGUAGES.map(language => (
            <div key={language.id} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md transition-colors">
              <RadioGroupItem value={language.id} id={language.id} />
              <Label htmlFor={language.id} className="cursor-pointer font-medium text-gray-900">
                {language.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
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
                  <span className="font-medium">MediNova Assistant</span>
                  <span className="text-xs text-white/90 flex items-center">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Health Assistant
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
                  {!isLanguageSelectionComplete && renderLanguageSelection()}
                  
                  {isLanguageSelectionComplete && (
                    <div className="flex items-center space-x-2">
                      {isVoiceInputRequired && (
                        <Button
                          onClick={isRecording ? stopRecording : startRecording}
                          className={cn(
                            "rounded-full flex-shrink-0",
                            isRecording ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"
                          )}
                        >
                          <Mic className="w-5 h-5 mr-1" />
                          {isRecording ? "Stop" : "Speak"}
                        </Button>
                      )}
                      <div className="relative rounded-full overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400 flex-grow">
                        <textarea
                          ref={inputRef}
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyDown={handleKeyPress}
                          placeholder={isVoiceInputRequired ? "Or type your question..." : "Ask any health question..."}
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
                  )}
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
                className="bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center gap-2"
              >
                <Bot className="w-6 h-6" />
                <LanguagesIcon className="w-5 h-5" />
                <span className="hidden md:inline font-medium">MediNova Assistant</span>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p className="text-gray-900">Ask MediNova Assistant</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default ChatAssistant;