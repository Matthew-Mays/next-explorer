import EventList from "../../components/events/event-list";
import { getAllEvents } from "../../dummy-data";
import EventsSearch from "../../components/events/events-search";
import { Fragment, useState } from "react";

const AllEventsPage = (props) => {
  const [events, setEvents] = useState(props.events);

  return (
    <Fragment>
      <EventsSearch />
      <EventList items={events} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-f7b80-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  const events = [];

  for (const key in data) {
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

  return { props: { events: events } };
}

export default AllEventsPage;
