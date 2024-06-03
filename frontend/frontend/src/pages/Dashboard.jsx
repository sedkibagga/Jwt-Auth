import React from 'react'

function Dashboard() {
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString); 
  console.log(user);
  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      {/* <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section> */}
    </>
  )
}

export default Dashboard