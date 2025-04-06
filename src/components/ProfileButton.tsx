
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProfileDialog from './ProfileDialog';
import { motion } from 'framer-motion';

const ProfileButton = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [profile, setProfile] = useState<{
    name: string;
    avatar: string | null;
  } | null>(null);
  
  useEffect(() => {
    // Fetch profile from localStorage on component mount
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile({
        name: parsedProfile.name,
        avatar: parsedProfile.avatar
      });
    }
  }, [profileOpen]); // Re-fetch when dialog closes

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          onClick={() => setProfileOpen(true)}
          variant="ghost" 
          className="p-1 h-10 w-10 rounded-full"
        >
          <Avatar className="h-9 w-9">
            {profile?.avatar ? (
              <AvatarImage src={profile.avatar} alt={profile.name || "User"} />
            ) : (
              <AvatarFallback className="bg-medical text-white">
                <User className="h-5 w-5" />
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </motion.div>
      
      <ProfileDialog 
        open={profileOpen} 
        onOpenChange={setProfileOpen} 
      />
    </>
  );
};

export default ProfileButton;
