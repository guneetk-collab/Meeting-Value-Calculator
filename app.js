const defaults = [
  ['Aarav Mehta', 1800000], ['Priya Shah', 1500000], ['Rohan Iyer', 1200000], ['Neha Kapoor', 1100000],
  ['Vikram Singh', 1400000], ['Ananya Rao', 1000000], ['Karan Malhotra', 1300000], ['Meera Nair', 900000]
];
const list = document.querySelector('#peopleList');
const template = document.querySelector('#personTemplate');
const money = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
const compactMoney = value => value >= 100000 ? `₹${(value / 100000).toFixed(value >= 1000000 ? 1 : 0)}L` : money.format(value);

function addPerson(name = 'New participant', salary = 1000000) {
  const row = template.content.firstElementChild.cloneNode(true);
  row.querySelector('.person-name').value = name;
  row.querySelector('.person-salary').value = salary;
  row.querySelector('.remove-person').addEventListener('click', () => { if (list.children.length > 1) { row.remove(); syncParticipantCount(); calculate(); } });
  row.querySelectorAll('input').forEach(input => input.addEventListener('input', calculate));
  list.append(row);
}
function syncParticipantCount() { document.querySelector('#participants').value = list.children.length; }
function calculate() {
  const duration = Math.max(1, Number(document.querySelector('#duration').value) || 0);
  const frequency = Math.max(1, Number(document.querySelector('#frequency').value) || 0);
  const people = [...list.querySelectorAll('.person-row')];
  const totalHourly = people.reduce((sum, row) => {
    const hourly = (Number(row.querySelector('.person-salary').value) || 0) / 2080;
    row.querySelector('.person-rate strong').textContent = money.format(hourly);
    return sum + hourly;
  }, 0);
  const total = totalHourly * duration / 60;
  const reduced = Math.max(15, Math.round((duration * .75) / 5) * 5);
  const minutesSaved = Math.max(0, duration - reduced);
  const saving = totalHourly * minutesSaved / 60;
  const yearlySavings = saving * frequency * 12;
  const name = document.querySelector('#meetingName').value.trim() || 'Meeting analysis';
  document.querySelector('#meetingPill').textContent = name.toUpperCase();
  document.querySelector('#totalCost').textContent = money.format(total);
  document.querySelector('#costPerMinute').textContent = `${money.format(total / duration)} per minute`;
  document.querySelector('#attendeeCount').textContent = `${people.length} ${people.length === 1 ? 'person' : 'people'}`;
  document.querySelector('#monthlyCost').textContent = compactMoney(total * frequency);
  document.querySelector('#annualCost').textContent = compactMoney(total * frequency * 12);
  document.querySelector('#reducedDuration').textContent = `${reduced} min`;
  document.querySelector('#minutesSaved').textContent = `${minutesSaved} minutes`;
  document.querySelector('#savingMeeting').textContent = compactMoney(saving);
  document.querySelector('#savingYear').textContent = compactMoney(yearlySavings);
  document.querySelector('#hoursSaved').textContent = `${Math.round((minutesSaved * frequency * 12 * people.length) / 60)} hrs`;
  const title = document.querySelector('#recommendationTitle');
  const text = document.querySelector('#recommendationText');
  if (total > 25000) { title.textContent = 'This is a high-value room—tighten the meeting design.'; text.textContent = `At ${money.format(total)} per session, circulate pre-reads, name the decision owner, and invite only people essential to the outcome.`; }
  else { title.textContent = 'A focused agenda could unlock meaningful capacity.'; text.textContent = 'Use the meeting cost as a prompt: what decision, alignment, or outcome needs to justify this investment?'; }
}
defaults.forEach(([name, salary]) => addPerson(name, salary));
document.querySelector('#addPerson').addEventListener('click', () => { addPerson(); syncParticipantCount(); calculate(); });
document.querySelector('#participants').addEventListener('change', event => { const desired = Math.max(1, Math.min(50, Number(event.target.value) || 1)); while (list.children.length < desired) addPerson(); while (list.children.length > desired) list.lastElementChild.remove(); calculate(); });
document.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => { const input = document.querySelector('#participants'); input.value = Math.max(1, Math.min(50, Number(input.value) + Number(button.dataset.step))); input.dispatchEvent(new Event('change')); }));
document.querySelectorAll('#duration, #frequency, #meetingName').forEach(input => input.addEventListener('input', calculate));
document.querySelector('#resetButton').addEventListener('click', () => { list.innerHTML = ''; defaults.forEach(([name, salary]) => addPerson(name, salary)); document.querySelector('#meetingName').value = 'Weekly leadership review'; document.querySelector('#duration').value = 60; document.querySelector('#frequency').value = 4; syncParticipantCount(); calculate(); });
document.querySelector('#copySummary').addEventListener('click', async event => { const name = document.querySelector('#meetingName').value || 'This meeting'; const summary = `${name}: ${document.querySelector('#totalCost').textContent} per meeting. Reducing duration by ${document.querySelector('#minutesSaved').textContent} could save ${document.querySelector('#savingYear').textContent} annually.`; try { await navigator.clipboard.writeText(summary); event.currentTarget.querySelector('span').textContent = 'Copied to clipboard'; setTimeout(() => event.currentTarget.querySelector('span').textContent = 'Copy business case', 1800); } catch { window.prompt('Copy this business case:', summary); } });
calculate();
