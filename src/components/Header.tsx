const Header = () => {
  return (
    <div className="flex bg-red-500 h-8 gap-2 items-center mb-4">
      <span className="relative flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
      </span>
      <span className="relative flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600"></span>
      </span>
      <p className="text-white text-end">by Jesus Castaneda</p>
    </div>
  )
}

export default Header