function Header() {

  return (
    <>
        <div className="header">
            <div className="navbar max-w-7xl mx-auto flex p-3 justify-around my-3">
               <div className="flex">
                  <h1 className='text-xl mr-6 hidden sm:block'>Menu</h1>
                  <h1 className='font-semibold text-xl'>Notezy</h1>
               </div>
               <input className='bg-black/10 rounded-full p-1 ps-3 outline-none w-1/2 min-w-1/3' type="search" placeholder='🔍 Search...' />
            </div>
        </div>
    </>
  )
}

export default Header