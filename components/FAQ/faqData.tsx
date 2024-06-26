import { FAQ } from "@/types/faq";

const faqData: FAQ[] = [
  {
    id: 1,
    quest: "How does the AI tool identify relevant cases based on my client's situation?",
    ans: "Our AI tool uses advanced natural language processing and machine learning algorithms to understand the key aspects of your client's situation. It then matches these aspects with the most relevant cases from our extensive database of South African court judgments, ensuring that you have access to the most applicable precedents.",
  },
  {
    id: 2,
    quest: "Which South African courts are covered in the tool's database?",
    ans: "Our tool covers judgments from a wide range of South African courts, including the Constitutional Court, the Supreme Court of Appeal, the High Courts, and the Labor Court. We regularly update our database to ensure that you have access to the latest and most relevant cases.",
  },
  {
    id: 3,
    quest: "Can I filter the identified cases by specific court jurisdictions?",
    ans: "Yes, our tool allows you to filter the identified cases by specific court jurisdictions, such as the Western Cape High Court or the Gauteng Local Division. This feature enables you to find cases that are most relevant to the court where your matter will be heard.",
  },
];

export default faqData;
