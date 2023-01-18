import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/event-list";
import { useState } from "react";
const HomePage = (props) => {
  const [events, setEvents] = useState(props.events);

  return (
    <div>
      <EventList items={events} />
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-f7b80-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  const events = [];

  for (const key in data) {
    if (data[key].isFeatured) {
      events.push({
        id: key,
        date: data[key].date,
        description: data[key].description,
        image: data[key].image,
        isFeatured: data[key].isFeatured,
        location: data[key].location,
        title: data[key].title,
      });
    }
  }
  return { props: { events: events } };
}

export default HomePage;
