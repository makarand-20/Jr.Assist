const links = [
    { name: 'Add Title'},
    { name: 'Write description' },
    { name: 'Add Cover Image' },
    { name: 'Choose Category' },
  ]
  export default function Example() {
    return (
      <div className="relative isolate overflow-hidden bg-white-900 pt-20 sm:pt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Edit blog</h2>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              Here you can edit your blog post, edit a title, change the cover image, update the content of your blog post.
            </p>
          </div>
        </div>
      </div>
    )
  }
  