import React, { useState } from 'react';
import { AiFillCloseCircle } from "react-icons/ai";



export default function Modals( {setIsModalOpen, modalRequestType, onDepense, onEncaisse, budget}){
    const [description, setDescription] = useState("") ;
    const [amount, setAmount] = useState("") ;

    const onButtonClick = () => { 
        if (!description || !amount){
            return;
            
        }
        if(modalRequestType=== "depense"){
            onDepense(description, amount);
            
        }
        if(modalRequestType=== "entree"){
            onEncaisse(description, amount);
        }
        setIsModalOpen(false);
    };

    return (

        <div className='modal-overlay'>
            <div className="modal">
                <AiFillCloseCircle
                    size={30}
                    color="black"
                    className="modal-close-icon"
                      /*lorsque que l'on clique sur la croix 
                       setIsModalOpen passe en "false" donc et selon la condition d'affichage du coponent  
                       Modal sur App.js Le component <Modal/> se ferme*/
                       onClick={()=> setIsModalOpen(false)}
                />

                {/*  Selon le click "Dépense" ou "Entrée" le titre à 
                l'ouverture de Modals va changer  */}
                <h2> {modalRequestType === 'depense' ? "soustraction" : " addition" }</h2>


                <input type="text" 
                       placeholder='Description'
                       value={description}
                       onChange={(e) => setDescription(e.target.value)}
                        />


                <input type="text" 
                       placeholder='Amount'
                       value = {amount}
                       onChange={(e) => setAmount(e.target.value)}/>


                <button onClick={onButtonClick}> 
                    {modalRequestType === 'depense' ? "soustraction" : " addition" }
                </button>
            </div>
            
        </div>
    )
}