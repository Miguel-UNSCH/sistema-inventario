function Prueba({message, status} : {message: string, status: number}) {
  return (
    <div className={`${status === 200 ? 'bg-green-400' : status === 400 ? 'bg-orange-400' : status === 500 ? '' : ''}`}>
      
      {message}
    </div>
  )
}

export default Prueba;
