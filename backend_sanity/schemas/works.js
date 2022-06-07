export default {
    name: 'works',
    title: 'Works',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
    
      {
        name: 'description',
        title: 'Description',
        type: 'string',
      },
      {
        name: 'projectLink',
        title: 'Project Link',
        type: 'string',
      },
      {
        name: 'codeLink',
        title: 'Code Link',
        type: 'string',
      },
      {
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [
          {
            name: 'imgUrl',
            title: 'ImageUrl',
            type: 'image',
            options: {
              hotspot: true,
            },
          }
        ]
      },
   
      {
        name: 'tags',
        title: 'Tags',
       type:'array',
       of: [
         {
           name:'tag',
           title:'Tag',
           type:'string'
         }
       ]
      },

      {
        name: 'photo_only',
        title: 'Photo Only',
        type: 'boolean'
      },

      {
        name: 'language',
        title: 'Language',
        type: 'string',
      }
     
    ],
  };
