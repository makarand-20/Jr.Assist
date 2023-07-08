import {BuildingOffice2Icon, UserGroupIcon, DevicePhoneMobileIcon, GlobeEuropeAfricaIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Company Guides',
    description:
      'Get insights and guidance on various companies, including their culture, interview process, and tips for success. Stay updated with the latest information to help you excel in your career.',
    icon: BuildingOffice2Icon,
  },
  {
    name: 'Student Clubs',
    description:
      'Discover and explore student clubs. Get information about different clubs, their activities, and how you can get involved to pursue your interests and passions.',
    icon: UserGroupIcon,
  },
  {
    name: 'Latest Technologies Guide',
    description:
      'Guide: Stay up-to-date with the latest technology trends and advancements. Get access to a wide range of topics, including emerging technologies, programming languages, frameworks, and tools.',
    icon: DevicePhoneMobileIcon,
  },
  {
    name: 'In General Guide',
    description:
      ' Access a comprehensive guide covering a variety of topics, including personal development, productivity tips, career advice, and more.',
    icon: GlobeEuropeAfricaIcon,
  },
]

export default function Example() {
  return (
    <div className="bg-white pb-10 sm:pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Grow faster</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything our juniors need to know about! 😌
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Those things which was missed by us, we will aware you here! And those things which is missing in the colleges syllbus, we will cover up them here! 🫵
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl sm:mt-10 lg:mt-10 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}