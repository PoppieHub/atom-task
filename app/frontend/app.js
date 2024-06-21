document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#loginForm');
    const loginError = document.querySelector('#login-error');
    const clientManagement = document.querySelector('#client-management');
    const clientsList = document.querySelector('#clients-list tbody');

    let currentUser = null;

    const BASIC_URL = 'http://localhost:3000';

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const login = document.querySelector('#login').value;
        const password = document.querySelector('#password').value;

        try {
            const response = await fetch(BASIC_URL + '/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password }),
            });

            const data = await response.json();
            if (data.success) {
                currentUser = data.user;
                loginError.textContent = '';
                document.getElementById('login-form').style.display = 'none';
                clientManagement.style.display = 'block';
                await loadClients();
            } else {
                loginError.textContent = data.message;
            }
        } catch (err) {
            loginError.textContent = 'Ошибка сервера - ' + err.message;
        }
    });

    const loadClients = async () => {
        try {
            const response = await fetch(BASIC_URL + `/api/clients?full_name=${currentUser.full_name}`);
            const data = await response.json();
            clientsList.innerHTML = data.clients.map(client =>
                `<tr>
                    <td>${client.account_number}</td>
                    <td>${client.last_name}</td>
                    <td>${client.first_name}</td>
                    <td>${client.second_name}</td>
                    <td>${client.birth_date}</td>
                    <td>${client.inn}</td>
                    <td>
                        <select class="status-select" data-account-number="${client.account_number}">
                            <option value="Не в работе" ${client.status === 'Не в работе' ? 'selected' : ''}>Не в работе</option>
                            <option value="В работе" ${client.status === 'В работе' ? 'selected' : ''}>В работе</option>
                            <option value="Отказ" ${client.status === 'Отказ' ? 'selected' : ''}>Отказ</option>
                            <option value="Сделка закрыта" ${client.status === 'Сделка закрыта' ? 'selected' : ''}>Сделка закрыта</option>
                        </select>
                    </td>
                </tr>`
            ).join('');

            document.querySelectorAll('.status-select').forEach(selectElement => {
                selectElement.addEventListener('change', async (e) => {
                    const accountNumber = e.target.dataset.accountNumber;
                    const status = e.target.value;
                    await changeClientStatus(accountNumber, status);
                });
            });
        } catch (err) {
            console.error('Ошибка при загрузке клиентов', err);
        }
    };

    const changeClientStatus = async (accountNumber, status) => {
        try {
            const response = await fetch(BASIC_URL + '/api/change_status', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ account_number: accountNumber, status }),
            });

            const data = await response.json();
            if (!data.success) {
                console.error('Ошибка при изменении статуса');
            }
        } catch (err) {
            console.error('Ошибка сервера - ' + err.message);
        }
    };
});
