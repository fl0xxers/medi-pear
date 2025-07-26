

const circle = document.querySelector('.circle');
const sidebar = document.querySelector('.side-navbar');
// const sidebarLinks = document.querySelectorAll('.side-navbar ul li a');

    circle.addEventListener('click', () => {
    sidebar.classList.toggle('closed');
    circle.classList.toggle('closed');

    const icon = circle.querySelector('i');
    icon.classList.toggle('fa-angle-right');
    icon.classList.toggle('fa-angle-left');

    });


 function openModal(id) {
  document.getElementById(id).classList.add("active");
}

function closeModal(id) {
  document.getElementById(id).classList.remove("active");
}

async function submitArticle() {
  const articleText = document.getElementById('article-input').value.trim();
  if (!articleText) {
    showNotification('Please enter article text.', false);
    return;
  }
  try {
    const response = await fetch('http://localhost:5501/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: articleText })
    });
    const data = await response.json();
    const resultElement = document.getElementById('trust-result');
    if (data.error) {
      resultElement.textContent = 'Error: ' + data.error;
      resultElement.style.color = '#FF6B6B'; // Red for error
    } else {
      resultElement.textContent = `Trust Score: ${data.trust_index} - ${data.message}`;
      resultElement.style.color = data.trust_index >= 0.75 ? '#6BCB77' : '#FF6B6B'; // Green for high, red for low
    }
    openModal('trust-score-modal');
    document.getElementById('article-input').value = '';
  } catch (error) {
    document.getElementById('trust-result').textContent = 'Failed to connect to the server.';
    document.getElementById('trust-result').style.color = '#FF6B6B';
    openModal('trust-score-modal');
  }
}

function showNotification(message, isSuccess) {
  const resultElement = document.getElementById('trust-result');
  resultElement.textContent = message;
  resultElement.style.color = isSuccess ? '#6BCB77' : '#FF6B6B';
  openModal('trust-score-modal');
}

