import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { Language } from '@/lib/i18next/i18n';
import { Earth } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Types
interface LanguageOption {
  value: Language;
  label: string;
}

// Constants
const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: 'en', label: 'English (US)' },
  { value: 'es', label: 'Español (ES)' },
];

export const LanguageSelect = () => {
  // "i18next"
  const { i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage;

  // Utils
  const handleLanguageChange = (value: Language) => i18n.changeLanguage(value);

  return (
    <Select value={currentLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-40 border-none shadow-none">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {LANGUAGE_OPTIONS.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            <Earth />
            <span>{label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
