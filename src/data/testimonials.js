export const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    quote:
      'Hasnain did an excellent job on our WordPress website. He was professional, responsive, and delivered exactly what we needed. The site looks great, works smoothly, and was completed on time.',
    service: 'WordPress website build',
    verified: true,
    featured: true,
  },
  {
    id: 2,
    name: 'James Carter',
    quote:
      'Working with Hasnain was a great experience. He helped us improve our Shopify store design and functionality, and the final result was clean, modern, and user-friendly. Highly recommended.',
    service: 'Shopify store improvement',
    verified: true,
    featured: true,
  },
  {
    id: 3,
    name: 'Emily Roberts',
    quote:
      'Hasnain built our Webflow website with great attention to detail. Communication was clear throughout the project, and he made sure everything was responsive and polished before delivery.',
    service: 'Webflow website build',
    verified: true,
    featured: true,
  },
  {
    id: 4,
    name: 'Daniel Walker',
    quote:
      'Hasnain helped us improve our website speed, structure, and overall performance. He explained everything clearly and handled the work professionally. We are very happy with the results.',
    service: 'Website speed and performance optimization',
    verified: true,
    featured: false,
  },
  {
    id: 5,
    name: 'Olivia Bennett',
    quote:
      'We hired Hasnain for a full website redesign, and he exceeded expectations. The new design looks much more professional, and the user experience is significantly better than before.',
    service: 'Full website redesign',
    verified: true,
    featured: false,
  },
  {
    id: 6,
    name: 'Michael Anderson',
    quote:
      'Hasnain is reliable, skilled, and easy to work with. He understood our requirements quickly and delivered a high-quality website that matched our brand perfectly. We would gladly work with him again.',
    service: 'Brand-matched website delivery',
    verified: true,
    featured: false,
  },
  {
    id: 7,
    name: 'Chloe Harrison',
    quote:
      'Hasnain helped us build an ecommerce website that looks professional and is easy for customers to use. He handled the design and technical side very well and stayed supportive even after launch.',
    service: 'Ecommerce website build',
    verified: true,
    featured: false,
  },
  {
    id: 8,
    name: 'Ryan Cooper',
    quote:
      'Hasnain has been very dependable for ongoing website support. Whenever we need updates, fixes, or improvements, he responds quickly and gets the job done efficiently.',
    service: 'Ongoing website support',
    verified: true,
    featured: false,
  },
  {
    id: 9,
    name: 'Sophie Turner',
    quote: 'Great experience working with Hasnain. Very professional, quick communication, and high-quality website work. Highly recommended.',
    service: 'Professional website implementation',
    verified: true,
    featured: false,
  },
  {
    id: 10,
    name: 'Ethan Brooks',
    quote:
      'Hasnain delivered our website exactly as promised. Clean design, smooth functionality, and excellent support throughout the project.',
    service: 'Website delivery and support',
    verified: true,
    featured: false,
  },
  {
    id: 11,
    name: 'Grace Phillips',
    quote:
      "Very satisfied with Hasnain's work. He is skilled, patient, and understands both design and development really well.",
    service: 'Design and development support',
    verified: true,
    featured: false,
  },
  {
    id: 12,
    name: 'Noah Parker',
    quote:
      'Hasnain was easy to work with and delivered a professional website on time. We are happy with the final result and would recommend him to others.',
    service: 'Professional website launch',
    verified: true,
    featured: false,
  },
]

export const publishedTestimonials = testimonials.filter((testimonial) => testimonial.verified)
export const featuredTestimonials = publishedTestimonials.filter((testimonial) => testimonial.featured)
