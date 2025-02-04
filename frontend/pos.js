document.addEventListener('DOMContentLoaded', () => {
    // Handle keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'F2':
                // Handle discount
                break;
            case 'F3':
                // Handle delete
                break;
            case 'F4':
                // Handle search
                break;
            case 'F8':
                // Handle quantity
                break;
            case 'F9':
                // Handle save sale
                break;
            case 'F10':
                // Handle payment
                break;
        }
    });

    // Initialize empty state
    const state = {
        items: [],
        subtotal: 0,
        tax: 0,
        total: 0
    };

    // Function to update totals
    function updateTotals() {
        const subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1; // 10% tax example
        const total = subtotal + tax;

        document.querySelector('.totals').innerHTML = `
            <div class="total-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>
            <div class="total-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
            </div>
            <div class="total-row grand-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </div>
        `;
    }

    // Initialize the POS system
    updateTotals();
}); 