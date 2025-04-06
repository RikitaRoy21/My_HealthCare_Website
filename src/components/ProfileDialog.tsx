
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  name: string;
  email: string;
  location: string;
  avatar: string | null;
}

const ProfileDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    email: '',
    location: '',
    avatar: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save profile to localStorage
    localStorage.setItem('userProfile', JSON.stringify(profile));
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your Profile</DialogTitle>
          <DialogDescription>
            Complete your profile information. This will help us personalize your experience.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                {profile.avatar ? (
                  <AvatarImage src={profile.avatar} alt="Profile" />
                ) : (
                  <AvatarFallback className="bg-medical text-white text-xl">
                    <User className="w-10 h-10" />
                  </AvatarFallback>
                )}
              </Avatar>
              <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-medical text-white p-1.5 rounded-full cursor-pointer hover:bg-medical-dark transition-colors">
                <Upload className="w-4 h-4" />
                <input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="hidden" 
                />
              </label>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={profile.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={profile.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Location
            </label>
            <Input
              id="location"
              name="location"
              placeholder="City, Country"
              value={profile.location}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="flex justify-end pt-4">
            <Button type="submit" className="bg-medical hover:bg-medical-dark">
              Save Profile
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
