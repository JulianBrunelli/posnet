const { createApp } = Vue;

createApp({
    data() {
        return {
            number: "",
            cvv: null,
            amount: null,
            description: ""
        }
    },
    created() {
    },
    methods: {
        posnet() {
            Swal.fire({
                title: 'Do you want to confirm the payment?',
                showDenyButton: true,
                confirmButtonText: 'Confirm',
                denyButtonText: 'Cancel',
            }).then((result) => {
                if (result.isConfirmed) {
                    let object = {
                        number: this.number,
                        cvv: this.cvv,
                        amount: this.amount,
                        description: this.description
                    }
                    axios.post('http://localhost:8080/api/transactions/cards', object)
                        .then(response => {
                            Swal.fire('Transaction successful!', '', 'success')
                                .then(response => {
                                    location.href = '../posnet.html'
                                })
                        })
                        .catch((error) => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: error.response.data,
                            })
                        })
                } else {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
        }
    }
}).mount('#app')