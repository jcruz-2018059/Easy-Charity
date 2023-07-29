import React from "react"

export const Donations =()=>{
    return(
        <>
        <h3 style={{textAlign: 'right'}}>Total Donado Q 670.00</h3>
        <h2 style={{textAlign: 'left'}}>Donaciones</h2>

        <div style={{backgroundColor: 'red', textAlign: 'left', height: 10, width: 350, borderRadius: 50}}></div>
        <br />
                <table className="table">
                    <thead className="">
                        <tr>
                            <th scope="col">Organización</th>
                            <th style={{color: 'red'}} scope="col">Descripción</th>
                            <th scope="col">Fecha</th>
                            <th style={{color: 'red'}} scope="col">Cantidad</th>
                        </tr>
                    </thead>
                        <tbody>
                            <tr className="">
                            <td>Teleton</td>
                            <td>Ayuda a los niños con cancer</td>
                            <td>22/03/2023</td>
                            <td>Q 100.00</td>
                            </tr>

                            <tr className="">
                            <td>Teleton</td>
                            <td>Ayuda a los niños con cancer</td>
                            <td>22/03/2023</td>
                            <td>Q 100.00</td>
                            </tr>
                        </tbody>
                </table>
        </>
    )
}