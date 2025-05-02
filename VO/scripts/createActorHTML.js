<script>
    function createActorHTML(dataArray) {
      return dataArray.map(function(actor) {
        // Destructure actor array
        var vo_name = actor[0];
        var name = actor[1];
        var gender = actor[2];
        var accent = actor[3];
        var countryRaw = actor[4];
        var style1 = actor[5];
        var style2 = actor[6];
        var style3 = actor[7];
        var style4 = actor[8];

        // Normalize the country field for classes
        var country = countryRaw;
        if (
          countryRaw === 'United States' ||
          countryRaw === 'United States - Appalachia' ||
          countryRaw === 'United States - Midwest' ||
          countryRaw === 'United States - Mountain West' ||
          countryRaw === 'United States - Southeast' ||
          countryRaw === 'United States - Texas'
        ) {
          country = 'unitedStates';
        }

        // Create classes string for filtering
        var classes = [gender, accent, country, style1, style2, style3, style4]
          .filter(function(item) { return Boolean(item); })
          .join(' ');

        var buttonsHTML = '';

        // NARRATION button
        if (style1 && style1.trim() !== '') {
          buttonsHTML +=
            '<button type="button" class="btn actor-block-btn" data-bs-toggle="modal" data-bs-target="#modal" onclick="openModal(\'actors/' + name + '/' + name + '_nar.mp4\', \'' + vo_name + '\')">' +
            '<i class="fa-regular fa-circle-play"></i>&nbsp;&nbsp;NARRATION' +
            '</button>';
        }

        // CONVERSATIONAL button
        if (style2 && style2.trim() !== '') {
          buttonsHTML +=
            '<button type="button" class="btn actor-block-btn" data-bs-toggle="modal" data-bs-target="#modal" onclick="openModal(\'actors/' + name + '/' + name + '_con.mp4\', \'' + vo_name + '\')">' +
            '<i class="fa-regular fa-circle-play"></i>&nbsp;&nbsp;CONVERSATIONAL' +
            '</button>';
        }

        // PROMO button
        if (style3 && style3.trim() !== '') {
          buttonsHTML +=
            '<button type="button" class="btn actor-block-btn" data-bs-toggle="modal" data-bs-target="#modal" onclick="openModal(\'actors/' + name + '/' + name + '_promo.mp4\', \'' + vo_name + '\')">' +
            '<i class="fa-regular fa-circle-play"></i>&nbsp;&nbsp;PROMO' +
            '</button>';
        }

        // CHARACTER button
        if (style4 && style4.trim() !== '') {
          buttonsHTML +=
            '<button type="button" class="btn actor-block-btn" data-bs-toggle="modal" data-bs-target="#modal" onclick="openModal(\'actors/' + name + '/' + name + '_char.mp4\', \'' + vo_name + '\')">' +
            '<i class="fa-regular fa-circle-play"></i>&nbsp;&nbsp;CHARACTER' +
            '</button>';
        }

        // Return the complete HTML block for the actor
        return (
          '<div id="paginated-item" class="mix actor-block ' + classes + ' all">' +
            '<img class="actor-img" src="actors/' + name + '/' + name + '.png" alt="actor image"/>' +
            '<div class="actor-block-title">' +
              '<h3>' + vo_name + '</h3>' +
            '</div>' +
            '<div>' +
              '<p class="actor-block-subtitle">' + accent + ' | ' + countryRaw + '</p>' +
            '</div>' +
            '<div class="actor-block-content-btm">' +
              buttonsHTML +
            '</div>' +
          '</div>'
        );
      }).join('');
    }

    window.openModal = function(videoPath, voName) {
      var modalTitle = document.getElementById('modalTitle');
      var modalVideo = document.getElementById('modalVideo');
      var source = modalVideo.querySelector('source');

      modalTitle.textContent = voName;
      source.src = videoPath;
      modalVideo.load();
    }

    document.getElementById('actor-container').innerHTML = createActorHTML(actorsData);
</script>
