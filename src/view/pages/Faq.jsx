import {useState} from "react";

const Faq = () => {
  const [selected, setSelected] = useState(0);

  const handleClick = index => () => setSelected(index)

  return (
    <div className="join join-vertical w-full p-12">
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" checked={selected === 0} onClick={handleClick(0)}/> 
        <div className="collapse-title text-xl font-medium">
          What is Suiroll?
        </div>
        <div className="collapse-content"> 
          <p>
            Suiroll is the smoothest decentralized dice game you will find, powered by the Sui blockchain. It is a fully on-chain game
            which utilizes VRF to select the random result. There is no central server or authority that decides the outcome of the game!
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" checked={selected === 1} onClick={handleClick(1)}/> 
        <div className="collapse-title text-xl font-medium">
          How to play?
        </div>
        <div className="collapse-content"> 
          <p>Simple</p>
          <ul>
            <li>- Guess if the sum of the two dices will be an even or odd number</li>
            <li>- Select the amount you want to bet</li>
            <li>- If your are correct then you double your bet</li>
          </ul>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" checked={selected === 2} onClick={handleClick(2)}/> 
        <div className="collapse-title text-xl font-medium">
          How does randomness work?
        </div>
        <div className="collapse-content"> 
          <p>Suiroll is based on the VRF smart contract on the Sui blockchain.</p>
          <br></br>
          <p>
            The process of selecting the random numbers starts by the front-end i.e. your computer selecting two random seeds.
            The seeds along with your guess (i.e. odd or even) will be stored on the Suiroll smart contract on the Sui blockchain.
          </p>
          <br></br>
          <p>
            Suiroll runs a distributed backend API and several other services that will use these seeds along with a VRF private key
            to generate two randome outputs which will be submitted to the smart contract.
          </p>
          <br></br>
          <p>The smart contract will use the ECVRF module to verify that the output was created using the VRF key and the user selected seed as described <a className="link link-warning" href="https://docs.sui.io/learn/cryptography/ecvrf" target="_blank">here</a></p>
          <br></br>
          <p>Based on the two random numbers the Suiroll smart contract determines whether user wins or not.</p>
          <br></br>
          <p>Does it mean that the same seed will emit the same random number?</p>
          <br></br>
          <p>Oh yes it does!</p>
          <br></br>
          <p>Does it mean I can cheat the game by using the same seed?</p>
          <br></br>
          <p>Unfortunately for you no. Each seed can be used only once :)</p>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" checked={selected === 3} onClick={handleClick(3)}/> 
        <div className="collapse-title text-xl font-medium">
          Where is the code?
        </div>
        <div className="collapse-content"> 
          <p>Suiroll is an open source project. Here is the <a className="link link-warning" href="https://github.com/Suiroll" target="_blank">repo</a></p>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" checked={selected === 4}onClick={handleClick(4)}/> 
        <div className="collapse-title text-xl font-medium">
          Disputes
        </div>
        <div className="collapse-content"> 
          <p>If for whatever reason the server does not submit the VRF outputs, use can claim the initial bet after the course of a day.</p>
          <br></br>
          <p>But don't worry; you won't have to deal with this scenario :)</p>
        </div>
      </div>
      <div className="collapse collapse-arrow join-item border border-base-300">
        <input type="radio" name="my-accordion-4" checked={selected === 5}onClick={handleClick(5)}/> 
        <div className="collapse-title text-xl font-medium">
          What coins do you support
        </div>
        <div className="collapse-content"> 
          <p>At the moment Suiroll support only the Sui coin. However the smart contract is developed to support multiple coins.</p>
        </div>
      </div>
    </div>
  );
}

export default Faq;
