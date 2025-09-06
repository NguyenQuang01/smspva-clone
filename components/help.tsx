"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export function Help() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const faqs = [
    {
      id: 1,
      question: "How I can sign up on SMSpva.com (video tutorial)?",
      answer: "You can watch our video tutorial on YouTube that shows the complete registration process step by step.",
    },
    {
      id: 2,
      question: "How I can get new SMS on number, which I get earlier?",
      answer: 'Then number keeps in base (during 1 day) you can get new SMS. You can do it in direction "history".',
    },
    {
      id: 3,
      question: "Why I can't get a number?",
      answer: "Because, a few numbers in base, but many people, who want to get numbers. Is formed live queue.",
    },
    {
      id: 4,
      question: "How much times one number can be used?",
      answer: "One number can be used for one service only once, but can be used for another services.",
    },
    {
      id: 5,
      question: "Then, why I enter number for some service, and he says, that this number using now?",
      answer:
        "Because, numbers can be reissued. For example: Someone bought SIM-card, register on this number some service and end using this service. After 3 month SIM-card was deactivated and now, any can be get this number. But service using this number yet.",
    },
    {
      id: 6,
      question: "How I can get a number (video tutorial)?",
      answer:
        'You should sign up, add funds and after, you can choose service and get number. You can join the queue and be among the first to receive a number as soon as it becomes available. To do this, select the desired service and a needed country. After that, click "Join the queue". You will see the order in the order panel in the state "Receiving number." To get the order, you must keep the tab open. The wait may take a long time. We recommend using countries where numbers are available. In our official telegram bot, you can subscribe to news about adding new numbers for your chosen services.',
    },
    {
      id: 7,
      question: "Which services I can use for add funds?",
      answer:
        "You can use this service now: Bitcoin, Webmoney, Yandex money, Credit card. All actual methods are presented in the Balance section.",
    },
    {
      id: 8,
      question: "How I can add funds (video tutorial)?",
      answer:
        "Watch our YouTube video tutorial that demonstrates the complete process of adding funds to your account.",
    },
    {
      id: 9,
      question: "Where I can find own activation history (video tutorial)?",
      answer: "Check our YouTube tutorial that shows how to access and navigate your activation history.",
    },
    {
      id: 10,
      question: "I add funds, but payment successful. What I should to do?",
      answer:
        "Payments going after some time. May be 1-2 hours. If you think, that something wrong, you can ask question in online chat.",
    },
  ]

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">F.A.Q.</h1>
          <p className="text-center text-muted-foreground mb-8">
            Before writing to tech support, we strongly encourage you to read the FAQs
          </p>

          <div className="bg-teal-600 text-white p-4 rounded-lg mb-6 text-center">
            For the treatment to support service is necessary make an autorization
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-card rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted transition-colors"
                >
                  <span className="font-medium">{faq.question}</span>
                  {expandedFaq === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-teal-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-teal-400" />
                  )}
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-6 pb-4 text-muted-foreground leading-relaxed">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
