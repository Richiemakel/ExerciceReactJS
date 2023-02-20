import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import Modal from "./components/Modals"
import { useState } from "react"
import uniqid from 'uniqid';
 // je recupere les icons apres avoir installer cette librairie https://react-icons.github.io/react-icons/
import {GiPayMoney, GiReceiveMoney } from 'react-icons/gi' ;
import { GrNotes} from "react-icons/gr";
function App() {
  let budget = 0;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRequestType, setModalRequestType] = useState("");
  const [depenses, setDepenses] = useState([])
  const [entrees, setEntrees] = useState([])

  // Selon le click "Dépense" ou "Entrée" le titre à l'ouverture de Modals va changer 
  //Voir Component Modals.jsx 
  const onDepenseClick =() => {
    setIsModalOpen(true);
    setModalRequestType("depense");
  };

  const onEntreeClick =() => {
    setIsModalOpen(true);
    setModalRequestType("entree");
  };

  const onDepense = (description, amount) => {
    //On recupere le tableau des dépense entièrement
    const oldDepense = [...depenses];
    
    const newDepense = {
      id: uniqid(),
      type:"depense",
      amount: amount,
      description: description,
    };
    //on crée un  tableau avec toute les ancienne depense + celle qu'on vient d'ajouter
    const newDepenses = oldDepense.concat(newDepense);
    setDepenses(newDepenses) ;
   
  };
  
  const onEncaisse = (description, amount) => {
    
    const oldEntree = [...entrees];
    
    const newEntree = {
      id: uniqid(),
      type:"entree",
      amount: amount,
      description: description,
    };

    const newEntrees = oldEntree.concat(newEntree);
    setEntrees(newEntrees);
  };

  const supressionTransaction = (type, id) => {
    if (type === "depense"){
      const oldDepense = [...depenses];
      const newDepenses = oldDepense.filter((depense) => depense.id !== id);

      setDepenses(newDepenses)
    }else if (type === "entree"){
      const oldEntree = [...entrees];
      const newEntrees = oldEntree.filter((entree) => entree.id !== id);

      setEntrees(newEntrees)
    }
  };

   const transactions = [...entrees, ...depenses]
  console.log(transactions) ;


    for(var i=0 ; i < transactions.length ; i++){
      if(transactions[i].type === "entree"){
        //Si la transaction est une entrée on ajoute le montant à la variable budget
        budget += parseInt(transactions[i].amount) ;
      }
      if(transactions[i].type === "depense"){
        //Si la transaction est une depense on s  le montant à la variable budget
        budget -= parseInt(transactions[i].amount) ;
      }
    }


 
  return (
    <div className="App">
      <Header/>
      {/* Si isModalOpen est égal à "true" le component Modal s'affiche */}
      {isModalOpen && 
      <Modal setIsModalOpen={ setIsModalOpen}
              modalRequestType={modalRequestType}
              onDepense={onDepense}
              onEncaisse={onEncaisse}
              budget={budget}

      />}
     
        <div className ="content">
          <h2>Budget: {budget}€</h2>
            <div className ="boxes-wrapper">


                  <div className="box-depense"     
                        onClick={() => onDepenseClick(true)}
                  >
                    <GiPayMoney size={100} color="red" />
                    Dépense
                  </div>



                  <div className='box-entree'
                    onClick={() => onEntreeClick(true)}
                  >
                    <GiReceiveMoney size={100} color="green" />
                    Entrée
                  </div>
          </div>

          
          <div className = "transactions-wrapper">
            {
              // Si il n'a pas eu de transaction on laisse 
              transactions.length > 0 ? (
              <h1> All Transactions </h1>) : (
             <div className='box-entree'
             >
                <GrNotes size={100} color="gold" />
                Pas de transactions
            </div>)
            }
          
           </div>
           { transactions.map((transactions) => (
                <div 
                  key={transactions.id}
                  style={({
                    width: "60",
                    height: "50px",
                    padding: "20px",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    fontSize: "20px",
                    marginTop: "20px",
                    background : transactions.type === "depense" ? "red" : "green",
                    display:"flex",
                    alignItems:"center",
                    justifyContent: "space-between"
                  })}  
                  onClick={()=> supressionTransaction(transactions.type, transactions.id)}       
                >
                  <div>{transactions.description}</div>
                  <div>{transactions.amount}€</div>
                </div>  
                ))


                }
      </div>
      <Footer/>
    </div>
  );
}

export default App;
