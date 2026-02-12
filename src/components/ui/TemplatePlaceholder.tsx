
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface TemplatePlaceholderProps {
    name: string;
    imageUrl?: string;
}

const TemplatePlaceholder: React.FC<TemplatePlaceholderProps> = ({ name, imageUrl }) => {
    const initials = name ? name.charAt(0).toUpperCase() : '?';
    
    return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
            <Card className="w-32 h-32 flex items-center justify-center shadow-md overflow-hidden">
                {imageUrl ? (
                    <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                ) : (
                    <CardContent className="p-4 text-center flex items-center justify-center h-full w-full">
                        <div className="text-3xl font-bold text-indigo-400 bg-indigo-50 rounded-full w-16 h-16 flex items-center justify-center">
                            {initials}
                        </div>
                    </CardContent>
                )}
            </Card>
        </div>
    );
};

export default TemplatePlaceholder;
