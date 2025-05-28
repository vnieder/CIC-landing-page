import React from "react";
import { HelpCircle, Folder, Briefcase, Handshake } from "lucide-react";
import { Suggestion } from "../types";

interface SuggestionButtonsProps {
  onSuggestionClick: (suggestion: string) => void;
  isDisabled: boolean;
}

const SuggestionButtons: React.FC<SuggestionButtonsProps> = ({
  onSuggestionClick,
  isDisabled,
}) => {
  const suggestions: Suggestion[] = [
    {
      text: "What is the Cloud Innovation Center",
      icon: HelpCircle,
    },
    { text: "Current projects", icon: Folder },
    { text: "Internship opportunities", icon: Briefcase },
    { text: "Industry partnerships", icon: Handshake },
  ];

  return (
    <div className="flex justify-center flex-wrap gap-2">
      {suggestions.map((suggestion, index) => {
        const IconComponent = suggestion.icon;
        return (
          <button
            key={index}
            type="button"
            onClick={() => onSuggestionClick(suggestion.text)}
            disabled={isDisabled}
            className="flex items-center justify-center space-x-2 px-4 py-3 text-sm bg-white bg-opacity-10 backdrop-blur-sm text-blue-200 rounded-2xl hover:bg-opacity-20 transition-all border border-white border-opacity-10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IconComponent className="w-4 h-4" />
            <span>{suggestion.text}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SuggestionButtons;
