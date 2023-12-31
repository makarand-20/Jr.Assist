import {Link} from 'react-router-dom'

export default function Example() {

  const callouts = [
    {
      name: 'Desk and Office',
      description: 'Comapanies Guides',
      imageSrc: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1773&q=80',
      href: '/company',
    },
    {
      name: 'Self-Improvement',
      description: 'Technology Guidence',
      imageSrc: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      href: '/technology',
    },
    {
      name: 'Clubs',
      description: 'Students clubs',
      imageSrc: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      href: '/clubs',
    },
  ]

  return (
    <>
        <div className="bg-white">
        <div className="relative isolate px-6 lg:px-8">
            <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
            >
            <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
            />
            </div>
            

            <div>
            <div className="mx-auto max-w-2xl lg:text-center mt-24">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Categories</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                The categories we have majorly covered
              </p>
            </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20">
                <div className="mx-auto max-w-2xl pt-10 sm:pt-10 lg:max-w-none lg:pt-10">
                  <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                    {callouts.map((callout) => (
                      <div key={callout.name} className="group relative">
                        <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                          <img
                            src={callout.imageSrc}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <h3 className="mt-6 text-sm text-gray-500">
                          <Link to={callout.href}>
                            <span className="absolute inset-0" />
                            {callout.name}
                          </Link>
                        </h3>
                        <p className="text-base font-semibold text-gray-900">{callout.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>



            <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
            >
            <div
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                style={{
                clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
            />
            </div>
        </div>
        </div>
    </> 
  )
}