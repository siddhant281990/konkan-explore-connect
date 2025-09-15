import { useState, useEffect } from 'react';
import { Instagram, Youtube, Save, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useSocialSettings } from '@/hooks/useSocialSettings';

const SocialSettingsCard = () => {
  const { settings, loading, updateSettings } = useSocialSettings();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    instagram_enabled: false,
    instagram_username: '',
    instagram_title: 'Follow us on Instagram',
    youtube_enabled: false,
    youtube_channel_id: '',
    youtube_title: 'Latest on YouTube'
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        instagram_enabled: settings.instagram_enabled,
        instagram_username: settings.instagram_username || '',
        instagram_title: settings.instagram_title,
        youtube_enabled: settings.youtube_enabled,
        youtube_channel_id: settings.youtube_channel_id || '',
        youtube_title: settings.youtube_title
      });
    }
  }, [settings]);

  const handleSave = async () => {
    if (saving) return;
    
    try {
      setSaving(true);
      await updateSettings(formData);
      toast({
        title: 'Success',
        description: 'Social media settings updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update social media settings',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">Loading social settings...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Instagram className="w-5 h-5 text-pink-500" />
          <span>Social Media Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            To connect Instagram and YouTube feeds, you'll need to add API keys via Supabase Secrets.
          </AlertDescription>
        </Alert>

        {/* Instagram Settings */}
        <div className="space-y-4 p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Instagram className="w-5 h-5 text-pink-500" />
              <Label htmlFor="instagram-enabled" className="text-base font-medium">Instagram Integration</Label>
            </div>
            <Switch
              id="instagram-enabled"
              checked={formData.instagram_enabled}
              onCheckedChange={(checked) => 
                setFormData({...formData, instagram_enabled: checked})
              }
            />
          </div>
          
          {formData.instagram_enabled && (
            <div className="space-y-3 ml-7">
              <div>
                <Label htmlFor="instagram-title">Section Title</Label>
                <Input
                  id="instagram-title"
                  value={formData.instagram_title}
                  onChange={(e) => setFormData({...formData, instagram_title: e.target.value})}
                  placeholder="Follow us on Instagram"
                />
              </div>
              <div>
                <Label htmlFor="instagram-username">Instagram Username</Label>
                <Input
                  id="instagram-username"
                  value={formData.instagram_username}
                  onChange={(e) => setFormData({...formData, instagram_username: e.target.value})}
                  placeholder="your_instagram_username"
                />
              </div>
            </div>
          )}
        </div>

        {/* YouTube Settings */}
        <div className="space-y-4 p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Youtube className="w-5 h-5 text-red-500" />
              <Label htmlFor="youtube-enabled" className="text-base font-medium">YouTube Integration</Label>
            </div>
            <Switch
              id="youtube-enabled"
              checked={formData.youtube_enabled}
              onCheckedChange={(checked) => 
                setFormData({...formData, youtube_enabled: checked})
              }
            />
          </div>
          
          {formData.youtube_enabled && (
            <div className="space-y-3 ml-7">
              <div>
                <Label htmlFor="youtube-title">Section Title</Label>
                <Input
                  id="youtube-title"
                  value={formData.youtube_title}
                  onChange={(e) => setFormData({...formData, youtube_title: e.target.value})}
                  placeholder="Latest on YouTube"
                />
              </div>
              <div>
                <Label htmlFor="youtube-channel">YouTube Channel ID</Label>
                <Input
                  id="youtube-channel"
                  value={formData.youtube_channel_id}
                  onChange={(e) => setFormData({...formData, youtube_channel_id: e.target.value})}
                  placeholder="UC1234567890ABCDEF"
                />
              </div>
            </div>
          )}
        </div>

        <Button 
          onClick={handleSave}
          disabled={saving}
          className="w-full"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save Social Settings'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SocialSettingsCard;