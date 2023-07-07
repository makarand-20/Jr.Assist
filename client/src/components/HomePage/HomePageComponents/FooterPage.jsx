export default function Example() {
  return (
    <div className="relative isolate overflow-hidden bg-white py-3 sm:py-3 lg:py-3">
      <div className="mx-auto">
        <div className="mx-auto">
          <div>
            <p className="flex justify-center mt-1 sm:text-sm lg:text-lg text-gray-900 leading-relaxed">
             Copyright @ reserved by &nbsp; <span className="text-blue-700 decoration-solid"> Makarand Khiste </span>
            </p>
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  )
}