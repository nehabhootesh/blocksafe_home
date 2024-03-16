//<script src="https://cdn.jsdelivr.net/npm/web3@1.6.0/dist/web3.min.js"></script>

//<script src="https://cdn.jsdelivr.net/npm/web3@1.5.3/dist/web3.min.js"></script>



var userid;
var address;
window.addEventListener('load', async () => {

    if (typeof window.ethereum !== 'undefined') {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else {
      alert('Please install MetaMask to use this dApp.');
    }

    try {
        // Send a POST request to the server
        
        fetch('/DFetchlogin')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Do something with the data
            })
            .catch(error => {
                console.error('Error:', error);
            });

        userid = data.DID;
        address = data.WAD;
        
        console.log('data is available');
  
    } catch (error) {
        console.error('Error:', error);
    }

  });

  // Handle form submission
  document.getElementById('acceptForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission

    const rideId = document.getElementById(`acceptRideId`).value;

    const message = "Driver with user ID: " + userid +" Accepted the ride for Ride ID: " + rideId; // Message to sign
    const accountAddress = address; // Your Ethereum account address

    try {
      const signature = await window.web3.eth.personal.sign(message, accountAddress, '');
      alert('Signature: ' + signature);
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please check the console.');
    }
});
