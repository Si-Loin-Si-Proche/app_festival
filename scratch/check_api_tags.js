const axios = require('axios');

const PROJECT_ID = 'ec53d277-9e98-4ece-b328-281d642dc9cb';
const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJCc0JqdUtXRUxCcVYxdEU4UEN0S3ZXa2oifQ.TJTMBkHNHJNXoI9ee28mv71CYA391NUou0xW8H4QhYI';
const TAG_ID = '26223';

async function checkTags() {
  try {
    const response = await axios.get(
      `https://api.artishoc.coop/${PROJECT_ID}/v1/contents`,
      {
        params: {
          'filter[tag_ids]': TAG_ID,
          include: 'tags,section_tags',
          per_page: 50,
        },
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    const included = response.data.included || [];
    const idToName = {};
    included.forEach((item) => {
      if (item.type === 'tag' || item.type === 'section_tag') {
        idToName[item.id] = item.attributes.title || item.attributes.name;
      }
    });

    response.data.data.forEach((ev) => {
      const tagIds = (ev.relationships.tags?.data || []).map((t) => t.id);
      const sectionTagIds = (ev.relationships.section_tags?.data || []).map(
        (t) => t.id
      );
      const allTagNames = [...tagIds, ...sectionTagIds]
        .map((id) => idToName[id])
        .filter(Boolean);

      console.log(`- ${ev.attributes.title}: [${allTagNames.join(', ')}]`);
    });
  } catch (error) {
    console.error(error.message);
  }
}

checkTags();
