
const pinataApiKey = 'edf14c4fc65f600cb6fd';
const pinataApiSecret = '8f2fbe45b747b592be9dedf356080c7969e8641e844a174e00bc7ffab51cc096';
const pinataEndpoint = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

function register() {
    const userType = document.getElementById('userType').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const gender = document.getElementById('gender').value;
    const walletAddress = document.getElementById('walletAddress').value;

    let additionalData;
    if (userType === 'driver') {
        const rcDocuments = document.getElementById('rcDocuments').value;
        const carNumber = document.getElementById('carNumber').value;
        const carModel = document.getElementById('carModel').value;
        const seats = document.getElementById('seats').value;

        additionalData = {
            rcDocuments,
            carNumber,
            carModel,
            seats
        };
    }

    const userData = {
        name,
        email,
        address,
        gender,
        walletAddress,
        ...additionalData
    };

    const jsonData = JSON.stringify(userData);

    const formData = new FormData();
    formData.append('file', new Blob([jsonData], { type: 'application/json' }));

    fetch(pinataEndpoint, {
        method: 'POST',
        headers: {
            'pinata_api_key': pinataApiKey,
            'pinata_secret_api_key': pinataApiSecret,
        },
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        const ipfsHash = data.IpfsHash;
        alert(`Registration successful! IPFS Hash: ${ipfsHash}. Please copy this hash for verification.`);
    })
    .catch(error => {
        console.error('Error uploading to Pinata IPFS:', error);
        alert('Error uploading to Pinata IPFS. Please try again.');
    });
}

document.getElementById('userType').addEventListener('change', function() {
    const driverFields = document.getElementById('driverFields');
    if (this.value === 'driver') {
        driverFields.style.display = 'block';
    } else {
        driverFields.style.display = 'none';
    }
});

function redirectToSubmission() {
    // Assuming the verification server is running on localhost:3000
    window.location.href = 'https://submit-verification.onrender.com'; // Change this URL as needed
}
