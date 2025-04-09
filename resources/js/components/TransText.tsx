import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import React from "react";

interface TextProps {
  ar: string;
  fr: string;
  en: string;
}

export const TransText: React.FC<TextProps> = (props) => {
  const page = usePage<SharedData>();
  const { auth } = page.props;

  const allowedLanguages = ["ar", "fr", "en"];
  const userLanguage = auth?.user?.language;
  const language = allowedLanguages.includes(userLanguage as string) ? userLanguage : "fr";

  return props[language as keyof TextProps] || props["fr"];
};

export default TransText;
