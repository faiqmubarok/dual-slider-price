document.getElementsByName("Tipe-Produk").forEach(element => {
    element.addEventListener("change", handleProductTypeChange);
});

document.getElementsByName('Kost-Budget').forEach(element => {
    element.addEventListener('change', handleBudgetChange);
});

function handleProductTypeChange() {
    let typeBudgetKost = document.getElementById('Type-Budget-Kost');
    let judulRange = document.getElementById('judul-range');

    if (this.checked && this.id === "Kontrakan") {
        typeBudgetKost.classList.add('hidden');
        judulRange.innerHTML = 'Harga per Tahun';
    } else {
        typeBudgetKost.classList.remove('hidden');
        handleBudgetChange();
    }
}

function handleBudgetChange() {
    let judulRange = document.getElementById('judul-range');
    let isBulananChecked = document.getElementById('Bulanan').checked;

    if (isBulananChecked) {
        judulRange.innerHTML = 'Harga per Bulan';
    } else {
        judulRange.innerHTML = 'Harga per Tahun';
    }
}

// Javascript Slider
document.addEventListener("DOMContentLoaded", function () {
    let minRange = document.getElementById("min-range");
    let maxRange = document.getElementById("max-range");
    let minInput = document.getElementById("min-input");
    let maxInput = document.getElementById("max-input");
    let track = document.getElementById("track");
    let minThumb = document.getElementById("min-thumb");
    let maxThumb = document.getElementById("max-thumb");

    let min = 0;
    let max = 5000000;
    let step = 100000;

    minRange.min = min;
    minRange.max = max;
    minRange.step = step;
    minRange.value = min;

    maxRange.min = min;
    maxRange.max = max;
    maxRange.step = step;
    maxRange.value = max;

    function formatRupiah(angka) {
        let reverse = angka.toString().split('').reverse().join('');
        let ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join('.').split('').reverse().join('');
        return ribuan;
    }

    function updateTrackAndThumbs() {
        const minVal = parseInt(minRange.value);
        const maxVal = parseInt(maxRange.value);

        const minPercent = ((minVal - min) / (max - min)) * 100;
        const maxPercent = ((maxVal - min) / (max - min)) * 100;

        track.style.left = minPercent + "%";
        track.style.right = 100 - maxPercent + "%";

        minThumb.style.left = minPercent + "%";
        maxThumb.style.left = maxPercent + "%";

        minInput.value = formatRupiah(minVal);
        maxInput.value = formatRupiah(maxVal);
    }

    function syncMinRange() {
        const minVal = Math.min(
            parseInt(minInput.value.replace(/\./g, '')) || 0,
            parseInt(maxRange.value) - step,
        );
        minRange.value = minVal;
        minInput.value = formatRupiah(minVal);
        updateTrackAndThumbs();
    }

    function syncMaxRange() {
        const maxVal = Math.max(
            parseInt(maxInput.value.replace(/\./g, '')) || max,
            parseInt(minRange.value) + step,
        );
        maxRange.value = maxVal;
        maxInput.value = formatRupiah(maxVal);
        updateTrackAndThumbs();
    }

    function enforceMinMax() {
        if (parseInt(minRange.value) > parseInt(maxRange.value) - step) {
            minRange.value = parseInt(maxRange.value) - step;
        }
        if (parseInt(maxRange.value) < parseInt(minRange.value) + step) {
            maxRange.value = parseInt(minRange.value) + step;
        }
        updateTrackAndThumbs();
    }

    minRange.addEventListener("input", function () {
        enforceMinMax();
    });

    maxRange.addEventListener("input", function () {
        enforceMinMax();
    });

    minInput.addEventListener("input", function () {
        syncMinRange();
    });

    maxInput.addEventListener("input", function () {
        syncMaxRange();
    });

    updateTrackAndThumbs();
});

// Reset Form
document.getElementById("reset-button").addEventListener("click", resetFilter);
function resetFilter(){
    const selectedRadio = document.querySelector('input[name="Tipe-Produk"]:checked',);
  const selectedValue = selectedRadio ? selectedRadio.value : null;

  document.getElementById("search-filter-form").reset();

  document.querySelector(`input[name="Tipe-Produk"][value="${selectedValue}"]`,).checked = true;
}

