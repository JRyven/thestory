$(() => {
  function fetchMarkdownContent() {

    const pathname = decodeURIComponent(window.location.pathname);
    console.log(pathname);
    const ajaxUrl = 'parts' + pathname + '.md';
    console.log(ajaxUrl);
    $.ajax({
      url: 'parts/memento mori.md',
        success: function(data) {
        renderMarkdown(data);
      },
      error: function() {
        console.error('error fetching Markdown content');
      }
    });
  }

  function renderMarkdown(yamlAndMarkdownString) {
    const yamlRegex = /^---([\s\S]*)---([\s\S]*)---/;
    const match = yamlAndMarkdownString.match(yamlRegex);
    if (match && match[1] && match[2]) {

      let yaml = '';
      let temp = '';
      let content = '';

      jsyaml.loadAll(match[1].trim(), function (yamlRaw) {
        yaml = yamlRaw;
      });

      content = match[2].split('\n\n');

      // console.log(yaml);
      // console.log(yaml.title);
      // console.log(content);

      content.forEach(contentLines => {

        if(contentLines !== ''){
          let subLines = contentLines.split('\n');

          if(subLines.length){

            subLines.forEach(line => {
              temp += `<p>${line}</p>`;
            });

          } else {
            temp += `<p>${lines}</p>`;
          }
        }
      });
      content = temp;

      const titleEl = document.querySelector('.feed .title');
      titleEl.innerHTML = yaml.title;

      const contentEl = document.querySelector('.feed .content');
      contentEl.innerHTML = content;

      const dateEl = document.querySelector('.feed .composed');
      dateEl.innerHTML = yaml.fileDate.toISOString().slice(0, 7);

      const tagsEl = document.querySelector('.feed .tags');

      let tagString = yaml.tags.map(tag => `<li>${tag}</li> | `).join('');

      if(tagString.split(/\s*\|\s*$/).length > 1) {
        tagString = tagString.split(/\s*\|\s*$/)[0];
      }

      tagsEl.innerHTML = tagString

    }

    return null;
  }

  fetchMarkdownContent();
});