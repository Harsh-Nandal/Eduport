<template>
  <div id="step-3" role="tabpanel" class="content fade" aria-labelledby="steppertrigger3">
    <h4>Curriculum</h4>
    <hr />
    <b-row>
      <div class="d-sm-flex justify-content-sm-between align-items-center mb-3">
        <h5 class="mb-2 mb-sm-0">Upload Lecture</h5>
        <b-button class="btn btn-sm btn-primary-soft mb-0" @click="showModal = true">
          <BIconPlusCircle class="me-2" />
          Add Lecture
        </b-button>
      </div>

      <b-accordion class="accordion-icon accordion-bg-light" id="accordionExample2">
        <b-accordion-item
          v-for="(lecture, lectureIndex) in lectures"
          :key="lectureIndex"
          :title="lecture.title"
          button-class="fw-bold rounded d-inline-block collapsed d-block pe-5"
          header-tag="h6"
          body-class="mt-3"
          header-class="font-base"
          class="mb-3"
        >
          <div v-for="(topic, topicIndex) in lecture.topics" :key="topicIndex">
            <div class="d-flex justify-content-between align-items-center">
              <div class="position-relative">
                <b-button class="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static">
                  <font-awesome-icon :icon="faPlay" />
                </b-button>
                <span class="ms-2 mb-0 h6 fw-light">{{ topic.name }}</span>
              </div>
              <div>
                <b-button class="btn btn-sm btn-success-soft btn-round me-1 mb-1 mb-md-0">
                  <font-awesome-icon :icon="faEdit" class="fa-fw" />
                </b-button>
                <b-button class="btn btn-sm btn-danger-soft btn-round mb-0" @click="deleteTopic(lectureIndex, topicIndex)">
                  <font-awesome-icon :icon="faTimes" class="fa-fw" />
                </b-button>
              </div>
            </div>
            <hr />
          </div>

          <b-button class="btn btn-sm btn-dark mb-0" @click="openTopicModal(lectureIndex)">
            <BIconPlusCircle class="me-2" />
            Add topic
          </b-button>
        </b-accordion-item>
      </b-accordion>

      <div class="d-flex justify-content-between mt-3">
        <b-button variant="secondary" class="prev-btn mb-0" @click="previousPage">Previous</b-button>
        <b-button variant="primary" class="next-btn mb-0" @click="nextPage">Next</b-button>
      </div>
    </b-row>

    <!-- Add Lecture Modal -->
    <b-modal v-model="showModal" title="Add Lecture" header-class="bg-dark" title-class="text-white" ok-title="Save Lecture"
      ok-variant="success" cancel-title="Close" cancel-variant="danger-soft" @ok="addLecture">
      <b-form class="row text-start g-3">
        <b-col cols="12">
          <b-form-group label="Lecture Name">
            <b-form-input v-model="newLecture.title" type="text" placeholder="Enter lecture name" required />
          </b-form-group>
        </b-col>
      </b-form>
    </b-modal>

    <!-- Add Topic Modal -->
    <b-modal v-model="showModal1" title="Add Topic" header-class="bg-dark" title-class="text-white" ok-title="Save Topic"
      ok-variant="success" cancel-title="Close" cancel-variant="danger-soft" @ok="addTopic">
      <b-form class="row text-start g-3">
        <b-col cols="12">
          <b-form-group label="Topic Name">
            <b-form-input v-model="newTopic.name" type="text" placeholder="Enter topic name" required />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Video Link">
            <b-form-input v-model="newTopic.videoUrl" type="text" placeholder="Enter video link" />
          </b-form-group>
        </b-col>
      </b-form>
    </b-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { faPlay, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { BIconPlusCircle } from 'bootstrap-icons-vue';

const showModal = ref(false);
const showModal1 = ref(false);
const selectedLectureIndex = ref(null);

// Reactive data for lectures & topics
const lectures = ref([
  { title: 'Introduction to Digital Marketing', topics: [{ name: 'What is Digital Marketing', videoUrl: '' }] },
  { title: 'Customer Life Cycle', topics: [] },
  { title: 'How much should I offer the sellers?', topics: [] }
]);

const newLecture = ref({ title: '' });
const newTopic = ref({ name: '', videoUrl: '' });

// Functions to add lectures & topics
const addLecture = () => {
  if (newLecture.value.title.trim()) {
    lectures.value.push({ title: newLecture.value.title, topics: [] });
    newLecture.value.title = '';
  }
};

const openTopicModal = (index) => {
  selectedLectureIndex.value = index;
  showModal1.value = true;
};

const addTopic = () => {
  if (selectedLectureIndex.value !== null && newTopic.value.name.trim()) {
    lectures.value[selectedLectureIndex.value].topics.push({
      name: newTopic.value.name,
      videoUrl: newTopic.value.videoUrl
    });
    newTopic.value.name = '';
    newTopic.value.videoUrl = '';
  }
};

const deleteTopic = (lectureIndex, topicIndex) => {
  lectures.value[lectureIndex].topics.splice(topicIndex, 1);
};

// Props for navigation buttons
defineProps(['nextPage', 'previousPage']);
</script>
