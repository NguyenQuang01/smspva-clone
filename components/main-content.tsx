import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, Shield, Globe, Zap, Phone, MessageSquare, Smartphone } from "lucide-react";
import { OrdersTable } from "@/components/orders-table";

export function MainContent() {
  return (
    <div className="flex-1 overflow-y-auto scroll-smooth">
      {/* Orders Section */}
      <div className="px-8 py-12">
        <div className="max-w-6xl">
          <OrdersTable />
        </div>
      </div>{" "}
      {/* Hero Section */}
      <div className="px-8 py-12">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-4">Receive SMS Online - SmsPva</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Receive SMS online to temporary numbers from all over the world
          </p>

          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3">
            Try it out <ArrowRight className="ml-2 w-4 h-4" />
          </Button>

          {/* Trust Indicators */}
          <div className="mt-12 flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.8/5</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm text-foreground">550,000+ users</span>
            </div>
          </div>

          <div className="mt-8 p-6 bg-card rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              We are trusted by more than 550,000 paying customers, and that number continues to grow...
            </h3>
            <p className="text-sm text-muted-foreground">
              Online temporary number service, you'll only get high-quality, reliable numbers with the highest success
              rates on the market today.
            </p>
          </div>
        </div>
      </div>
      {/* How to Use Section */}
      <div className="px-8 py-12 bg-card/50">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground mb-8">How use the SMSpva?</h2>
          <p className="text-muted-foreground mb-8">
            To get a temporary number for receiving SMS, you will need to do 3 simple steps
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Get the temp number</h3>
              <p className="text-sm text-muted-foreground">
                Choose the service from which you want to receive SMS and choose the country from which this number
                should be
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Send SMS to the phone number</h3>
              <p className="text-sm text-muted-foreground">
                Enter this phone number into the form on the website where the verification code is required website
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Get an SMS on the website</h3>
              <p className="text-sm text-muted-foreground">
                After receiving the SMS with the verification code, you can complete the account activation
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="px-8 py-12">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            SMSpva is one of the first websites for selling phone numbers
          </h2>
          <p className="text-muted-foreground mb-12">
            SmsPva provides the opportunity to use short-term temp phone numbers from different countries at fair and
            affordable prices for receiving SMS messages.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Account verification</h3>
                <p className="text-sm text-muted-foreground">
                  Simplify online account verification by getting instant confirmation codes on popular apps or
                  services. Set up SMS gateway QR tests effortlessly.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Over 60 countries</h3>
                <p className="text-sm text-muted-foreground">
                  Get 2nd number from a wide range of countries such as USA, UK, China, Australia, India, Germany,
                  Netherlands, Poland, Spain and many more.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Instant number selection</h3>
                <p className="text-sm text-muted-foreground">
                  In just a few clicks, you can get a second number on any popular service and receive SMS messages on
                  it almost instantly.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Privacy protection</h3>
                <p className="text-sm text-muted-foreground">
                  To protect your privacy, use our disposable phone numbers instead of your real phone number when
                  registering on websites or in apps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <div className="px-8 py-12 bg-card/50">
        <div className="max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Complete a simple registration and receive a phone number for SMS
          </h2>
          <p className="text-muted-foreground mb-8">Get the opportunity to use our numbers for registration!</p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
            Sign up <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
