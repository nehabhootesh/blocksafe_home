
document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  // Get userId and walletAddress from input fields
  const userId = document.getElementById('userId').value;
  const walletAddress = document.getElementById('walletAddress').value;

  try {
      // Send a POST request to the server
      const response = await fetch('/Clogin', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId, walletAddress })
      });

      // Parse the JSON response
      const data = await response.json();
      console.log('data is available');

      // Check if the request was successful
      if (response.ok) {
          // Extract walletAddress from the response data
          const walletAddress = data.walletAddress;

          // Use the walletAddress as needed
          console.log('Wallet Address:', walletAddress);

          // Call signAndSaveMessage function with walletAddress
          signAndSaveMessage(walletAddress);
         
      } else {
          // Display error message
          alert(data.message);
      }
  } catch (error) {
      console.error('Error:', error);
  }
});

const contractAddress = '0xCeD8E5d96da547Cb4C9f49C83159f128e4364484';
        const contractABI = [
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_message",
                        "type": "string"
                    }
                ],
                "name": "signMessage",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ];
    
        // Create a web3 instance using the given provider
        const web3 = new Web3(window.ethereum);
    
        // Create a contract instance
        const contract = new web3.eth.Contract(contractABI, contractAddress);
    
        // Function to sign and save the message
        async function signAndSaveMessage(name) {
            const message = `Signing message for ${name}`;
    
            try {
                // Request account access if needed
                await ethereum.enable();
    
                // Get the current Ethereum account
                // const accounts = await web3.eth.getAccounts();
                const account = name ;
    
                // Send a transaction to sign and save the message
                const tx = await contract.methods.signMessage(message).send({
                    from: account
                });
                const result = await web3.eth.personal.sign(message, account);
                // Display success message
                console.log('Transaction receipt:', tx);
                alert(`Loged in for ${name}! Signature: ${result}`);
                window.location.href = "Cindex.html";

            } catch (error) {
                console.error('Error signing and saving message:', error);
                alert(`Error signing and saving message for ${name}: ${error.message}`);
            }
        }

// Function to login to the dashboard

