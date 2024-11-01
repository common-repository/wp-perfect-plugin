document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('w3p-excerpt')) {
        const title = document.getElementById('w3p-title');
        const excerpt = document.getElementById('w3p-excerpt');
        const titleMeter = document.getElementById('w3p-meter--title');
        const excerptMeter = document.getElementById('w3p-meter--excerpt');

        const TITLE_THRESHOLDS = { low: 20, high: 40, max: 60 };
        const EXCERPT_THRESHOLDS = { low: 60, high: 120, max: 160 };

        function changeMeter(val, thresholds, meter) {
            const { low, high, max } = thresholds;
            const color = (val <= low || val > max) ? '#e74c3c' : val < high ? '#e67e22' : '#27ae60';
            const val_percentage = (100 * val) / max;

            meter.style.background = color;
            meter.value = val;

            meter.style.width = `${Math.min(val_percentage, 100)}%`;
        }

        function updateMeterForInput(element, thresholds, meter) {
            changeMeter(element.value.length, thresholds, meter);
            element.addEventListener('input', () => {
                changeMeter(element.value.length, thresholds, meter);
            });
        }

        updateMeterForInput(title, TITLE_THRESHOLDS, titleMeter);
        updateMeterForInput(excerpt, EXCERPT_THRESHOLDS, excerptMeter);
    }



    if (document.querySelector('.w3p-add-repeater-field')) {
        const repeaterContainer = document.querySelector('.w3p-repeater-container');
        const repeaterFields = repeaterContainer.querySelector('.w3p-repeater-fields');
        const addFieldButton = repeaterContainer.querySelector('.w3p-add-repeater-field');

        // Add a new repeater field
        addFieldButton.addEventListener('click', function () {
            const lastField = repeaterFields.querySelector('.w3p-repeater-field:last-of-type');
            console.log(lastField);
            const newFieldIndex = lastField ? parseInt(lastField.dataset.index) + 1 : 0;
            const newField = document.createElement('div');
            newField.className = 'w3p-repeater-field';
            newField.setAttribute('draggable', true);
            newField.dataset.index = newFieldIndex;
            newField.innerHTML = '<span class="dashicons dashicons-move"></span>' +
                '<input type="text" class="regular-text" name="w3p_link_repeater[' + newFieldIndex + '][title]" placeholder="Title">' +
                '<input type="url" class="regular-text" name="w3p_link_repeater[' + newFieldIndex + '][url]" placeholder="URL">' +
                '<input type="text" class="regular-text" name="w3p_link_repeater[' + newFieldIndex + '][rel]" placeholder="Relationship">' +
                '<button type="button" class="button button-secondary w3p-remove-repeater-field">Remove</button>';
            repeaterFields.appendChild(newField);

            // Add event listener to remove button
            const removeFieldButton = newField.querySelector('.w3p-remove-repeater-field');
            removeFieldButton.addEventListener('click', function () {
                repeaterFields.removeChild(newField);
            });
        });

        // Add event listener to remove button for existing fields
        repeaterFields.querySelectorAll('.w3p-remove-repeater-field').forEach(function (button) {
            button.addEventListener('click', function () {
                button.closest('.w3p-repeater-field').remove();
            });
        });
    }
});
