import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

interface ContactInfoProps {
  dictionary: {
    address: string
    phone: string
    email: string
    hours: string
  }
}

export function ContactInfo({ dictionary }: ContactInfoProps) {
  const contactItems = [
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Address",
      value: dictionary.address,
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: dictionary.phone,
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: dictionary.email,
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: "Hours",
      value: dictionary.hours,
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {contactItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="text-primary mt-0.5">{item.icon}</div>
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-muted-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Map placeholder */}
      <Card>
        <CardContent className="p-0">
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Map placeholder</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
