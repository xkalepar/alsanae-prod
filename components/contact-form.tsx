"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm } from "@/lib/actions";
import type { Locale } from "@/lib/i18n/settings";
import { CheckCircle, AlertCircle } from "lucide-react";

interface ContactFormProps {
  dictionary: {
    name: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
    success: string;
    error: string;
  };
  lang: Locale;
}

export function ContactForm({ dictionary, lang }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const isRtl = lang === "ar";

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setStatus("idle");

    try {
      await submitContactForm(formData);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card>
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">
              {lang === "en" ? "Message Sent!" : "تم إرسال الرسالة!"}
            </h3>
            <p className="text-muted-foreground">{dictionary.success}</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardHeader>
          <CardTitle className={isRtl ? "text-right" : "text-left"}>
            {lang === "en" ? "Send us a message" : "أرسل لنا رسالة"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{dictionary.name}</Label>
              <Input
                id="name"
                name="name"
                required
                className={isRtl ? "text-right" : "text-left"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{dictionary.email}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className={isRtl ? "text-right" : "text-left"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">{dictionary.subject}</Label>
              <Input
                id="subject"
                name="subject"
                required
                className={isRtl ? "text-right" : "text-left"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">{dictionary.message}</Label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                required
                className={isRtl ? "text-right" : "text-left"}
              />
            </div>

            {status === "error" && (
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{dictionary.error}</span>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting
                ? lang === "en"
                  ? "Sending..."
                  : "جاري الإرسال..."
                : dictionary.submit}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
