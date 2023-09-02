
const HomeCards = () => {
  return (
    <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden mx-3 p-4">
        <div className="h-[13rem] w-[10rem]">
          <img 
          className=" w-full h-full" 
          src="https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"/>
        </div>

        <div className="p-4">
            <h3 className=" text-brown text-lg font-medium">Adjustable Dumbbell Set</h3>
            <p className="mt-2 text-sm text-fog">Get a versatile workout with our </p>
        </div>
    </div>
  )
}

export default HomeCards