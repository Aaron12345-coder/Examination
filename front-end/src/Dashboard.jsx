import React from 'react'

function Dashboard() {
  return (
    <> <div className="p-8 bg-gray-100 min-h-screen">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    
    {/* Contact Card */}
    <div className="bg-green-700 text-white rounded-xl shadow-lg p-6 hover:scale-105 transition-transform h-100 mt-30">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <p className="text-sm leading-relaxed">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quasi totam recusandae, adipisci a reiciendis hic. Ex, blanditiis deleniti? 
        Sed unde ut, beatae magni itaque at, ullam iusto accusamus sint dicta perspiciatis, 
        architecto tenetur excepturi.
      </p>
    </div>

    {/* Services Card */}
    <div className="bg-green-700 text-white rounded-xl shadow-lg p-6 hover:scale-105 transition-transform h-100 mt-30">
      <h1 className="text-3xl font-bold mb-4">Services</h1>
      <p className="text-sm leading-relaxed">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quasi totam recusandae, adipisci a reiciendis hic. Ex, blanditiis deleniti? 
        Sed unde ut, beatae magni itaque at, ullam iusto accusamus sint dicta perspiciatis, 
        architecto tenetur excepturi.
      </p>
    </div>

    {/* Partner Card */}
    <div className="bg-green-700 text-white rounded-xl shadow-lg p-6 hover:scale-105 transition-transform h-100 mt-30">
      <h1 className="text-3xl font-bold mb-4">Partner</h1>
      <p className="text-sm leading-relaxed">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quasi totam recusandae, adipisci a reiciendis hic. Ex, blanditiis deleniti? 
        Sed unde ut, beatae magni itaque at, ullam iusto accusamus sint dicta perspiciatis, 
        architecto tenetur excepturi.
      </p>
    </div>

  </div>
</div>

    </>

  )
}

export default Dashboard