const Write = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Write New Article</h1>
      <div className="max-w-4xl mx-auto">
        <input 
          type="text" 
          placeholder="Article title..." 
          className="w-full p-4 text-2xl border border-gray-300 rounded-lg mb-4"
        />
        <textarea 
          placeholder="Write your article..." 
          className="w-full h-96 p-4 border border-gray-300 rounded-lg resize-none"
        />
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Publish Article
        </button>
      </div>
    </div>
  )
}

export default Write
