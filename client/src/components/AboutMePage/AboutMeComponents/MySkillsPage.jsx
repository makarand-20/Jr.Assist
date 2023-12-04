import {FaGithub} from 'react-icons/fa'
export default function Example() {
  return (
    <div>

      <div className="flex justify-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Makarand's Github repos 🐍
        </h2>
      </div>

      <div className="flex justify-center">
        <img className='bg-gradient-to-r from-sky-500 to-indigo-300 sm:h-60 h-auto object-fill' src="/makW.svg" alt="snake eating my repos" />
      </div>

      <div className="flex justify-center mt-10">
        <a href="https://github.com/makarand-20?tab=repositories" target='_blank'>
          <button className="rounded-full bg-transperent text-black ring-2 ring-black shadow-xl py-2.5 px-3 flex items-center justify-center gap-2">
            Visit repos <FaGithub />
          </button>
        </a>
      </div>
      
      <div className="flex justify-center items-center mt-36 mb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Our Skills 👨‍💻
          </h1>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-14 sm:px-6 sm:py-24 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
      <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            src="/assets/js.svg"
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            className="rounded-lg bg-gray-100"
          />
          <img
            src="/assets/react.png"
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            className="rounded-lg bg-gray-100"
          />
          <img
            src="/assets/redux.png"
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            className="rounded-lg bg-gray-100 w-full h-full"
          />
          <img
            src="/assets/git.jpg"
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            className="rounded-lg bg-gray-100 w-full h-full"
          />
          <img
            src="/assets/mongo.png"
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            className="rounded-lg bg-gray-100"
          />
          <img
            src="/assets/node.png"
            alt="Side of walnut card tray with card groove and recessed card area."
            className="rounded-lg bg-gray-100"
          />
          
          
        </div>
        


        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
        <img
            src="/assets/android.jpg"
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            className="rounded-lg bg-gr
            ay-100"
          />
            <img
            src="/assets/firebase.png"
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            className="rounded-lg bg-gray-100"
          />
          <img
            src="/assets/java.jpg"
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            className="rounded-lg bg-gray-100 w-full"
          />
          <img
            src="/assets/flutter.png"
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            className="rounded-lg bg-gray-100 w-full h-full"
          />
          <img
            src="/assets/jenkins.webp"
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            className="rounded-lg bg-gray-100"
          />
          <img
            src="/assets/python.webp"
            alt="Side of walnut card tray with card groove and recessed card area."
            className="rounded-lg bg-gray-100 w-full h-full"
          />
        </div>
      </div>
    </div>
  )
}
