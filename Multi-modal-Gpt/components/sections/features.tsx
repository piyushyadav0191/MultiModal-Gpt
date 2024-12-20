import Features from 'components/features-horizontal'
import Section from 'components/section'
import { BarChart3, Brain, FileText, LineChart } from 'lucide-react'

const data = [
   {
      id: 1,
      title: 'AI-Powered Search Engine',
      content: 'Quickly find the information you need with our advanced search capabilities.',
      image: '/dashboard.png',
      icon: <BarChart3 className="size-6 text-primary" />,
   },
   {
      id: 2,
      title: 'Natural Language Processing',
      content: 'Analyze text and extract sentiment effortlessly.',
      image: '/dashboard.png',
      icon: <Brain className="size-6 text-primary" />,
   },
   {
      id: 3,
      title: 'Image, Text, PDF Processing',
      content: 'Extract data from images, text, and PDFs with ease.',
      image: '/dashboard.png',
      icon: <LineChart className="size-6 text-primary" />,
   },
   {
      id: 4,
      title: 'Example',
      content: 'Generate comprehensive reports with one click.',
      image: '/dashboard.png',
      icon: <FileText className="size-6 text-primary" />,
   },
]

export default function Component() {
   return (
      <Section title="Features" subtitle="User Flows and Navigational Structures">
         <Features collapseDelay={5000} linePosition="bottom" data={data} />
      </Section>
   )
}
