// Membership page script
// Author: Shounak Roy
//
// Feature 1: Student / Non-student price toggle
//   - Two radio buttons in the hero switch every price on the page
//     (plan cards and the comparison table).
//   - Non-students pay €10 more per tier (see CONTENT.md / FAQ).
//
// Feature 2: Plan selection and comparison highlight
//   - "Choose ..." buttons on the cards, or the plan names in the
//     comparison table, select a plan.
//   - The chosen card and its table column are highlighted, and a
//     summary bar shows the plan, its current price and a link to
//     the Contact page.

// Only run on the Membership page (the price toggle only exists there)
const priceToggles = document.querySelectorAll('input[name="priceType"]');

if (priceToggles.length > 0) {
  // ---------- Plan data: one place to change names and prices ----------
  const plans = {
    offpeak: { name: 'Off-Peak Student', studentPrice: 35 },
    allaccess: { name: 'All-Access Student', studentPrice: 49 },
    pro: { name: 'Pro & Recovery', studentPrice: 65 }
  };
  const NON_STUDENT_EXTRA = 10; // non-students pay €10 extra per tier

  // Current state of the page
  let priceType = 'student'; // 'student' or 'standard'
  let selectedPlan = null; // 'offpeak', 'allaccess', 'pro' or null

  // ---------- Elements ----------
  const priceTypeNote = document.getElementById('priceTypeNote');
  const chooseButtons = document.querySelectorAll('.choose-plan');
  const tableButtons = document.querySelectorAll('.compare-select');
  const planCards = document.querySelectorAll('.plan-card');
  const tableCells = document.querySelectorAll('.compare-table [data-plan]');
  const statusMessage = document.getElementById('planStatus');
  const summary = document.getElementById('planSummary');
  const summaryName = document.getElementById('summaryName');
  const summaryPrice = document.getElementById('summaryPrice');
  const summaryLink = document.getElementById('summaryLink');
  const clearButton = document.getElementById('clearPlan');

  // ---------- Helpers ----------

  // Price of a plan for the current price type
  const priceFor = (planKey) => {
    const base = plans[planKey].studentPrice;
    return priceType === 'student' ? base : base + NON_STUDENT_EXTRA;
  };

  // e.g. "€49/month"
  const priceLabel = (planKey) => `€${priceFor(planKey)}/month`;

  // Sends a short message to screen readers (aria-live region)
  const announce = (message) => {
    statusMessage.textContent = message;
  };

  // ---------- Feature 1: price toggle ----------

  const updatePrices = () => {
    Object.keys(plans).forEach((planKey) => {
      // Big price on each card
      document.querySelector(`.price[data-price="${planKey}"]`).textContent = `€${priceFor(planKey)}`;
      // Small price under each plan name in the table
      document.querySelector(`.compare-price[data-price="${planKey}"]`).textContent = priceLabel(planKey);
    });

    // "Student rate" / "Non-student rate" line on every card
    document.querySelectorAll('.price-type').forEach((line) => {
      line.textContent = priceType === 'student' ? 'Student rate' : 'Non-student rate';
    });

    priceTypeNote.textContent =
      priceType === 'student'
        ? 'Student rates need a valid college ID or Student Leap Card.'
        : `Non-student rates are €${NON_STUDENT_EXTRA} a month more on every plan.`;

    updateSummary(); // keep the summary price in step with the toggle
  };

  priceToggles.forEach((radio) => {
    radio.addEventListener('change', () => {
      priceType = radio.value;
      updatePrices();
      announce(priceType === 'student' ? 'Showing student prices.' : 'Showing non-student prices.');
    });
  });

  // ---------- Feature 2: plan selection and comparison highlight ----------

  function updateSummary() {
    if (!selectedPlan) {
      summary.hidden = true;
      return;
    }
    summaryName.textContent = plans[selectedPlan].name;
    summaryPrice.textContent = `${priceLabel(selectedPlan)} (${priceType === 'student' ? 'student' : 'non-student'} rate)`;
    // Pass the choice to the Contact page, e.g. contact.html?plan=pro&rate=student
    summaryLink.href = `./contact.html?plan=${selectedPlan}&rate=${priceType}`;
    summary.hidden = false;
  }

  const selectPlan = (planKey) => {
    // Choosing the same plan again clears the selection
    selectedPlan = selectedPlan === planKey ? null : planKey;

    // Highlight the chosen card
    planCards.forEach((card) => {
      card.classList.toggle('is-selected', card.dataset.plan === selectedPlan);
    });

    // Card buttons: pressed state and wording
    chooseButtons.forEach((button) => {
      const isChosen = button.dataset.plan === selectedPlan;
      button.setAttribute('aria-pressed', isChosen ? 'true' : 'false');
      button.classList.toggle('btn-solid', isChosen);
      button.classList.toggle('btn-outline', !isChosen);
      button.textContent = isChosen ? 'Selected' : button.dataset.label;
    });

    // Highlight the matching column in the comparison table
    tableCells.forEach((cell) => {
      cell.classList.toggle('is-highlighted', cell.dataset.plan === selectedPlan);
    });
    tableButtons.forEach((button) => {
      button.setAttribute('aria-pressed', button.dataset.plan === selectedPlan ? 'true' : 'false');
    });

    updateSummary();
    announce(
      selectedPlan
        ? `${plans[selectedPlan].name} selected at ${priceLabel(selectedPlan)}.`
        : 'Plan choice cleared.'
    );
  };

  // Remember each button's original wording, e.g. "Choose Off-Peak"
  chooseButtons.forEach((button) => {
    button.dataset.label = button.textContent.trim();
    button.addEventListener('click', () => selectPlan(button.dataset.plan));
  });

  tableButtons.forEach((button) => {
    button.addEventListener('click', () => selectPlan(button.dataset.plan));
  });

  clearButton.addEventListener('click', () => {
    if (selectedPlan) {
      selectPlan(selectedPlan); // selecting the current plan again clears it
    }
  });

  // Show the correct prices when the page first loads
  updatePrices();
}
