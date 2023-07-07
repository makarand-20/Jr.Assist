const links = [
    { name: 'Add Title'},
    { name: 'Write description' },
    { name: 'Add Cover Image' },
    { name: 'Choose Category' },
  ]
  export default function Example() {
    return (
      <div className="relative isolate overflow-hidden bg-white-900 pt-14 sm:pt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Create a blog post</h2>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              Here you can create a blog post. You can add a title, a cover image, and the content of your blog post.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-gray-700 sm:grid-cols-2 md:flex lg:gap-x-10">
              {links.map((link) => (
                <p key={link.name} className="flex items-start">
                  {link.name} <span aria-hidden="true">&rarr;</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  