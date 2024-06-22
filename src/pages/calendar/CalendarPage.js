import React, { useState, useEffect } from "react";
import {
  ScheduleComponent,
  TimelineViews,
  TimelineMonth,
  Agenda,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { Typography, CircularProgress } from "@mui/material";
import HelmetComponent from "../../components/helmet/HelmetComponent";
import { EDISPATCHED } from "../../utils/Constants";
import "./timeline-resource-grouping.css";
import { fetchGETRequest } from "../../utils/Services";
import { COLOR_OBJECT } from "../../utils/Color";

const CalendarPage = () => {
  const [data, setData] = useState([]);
  const [PilotData, setPilotData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewedStartDateArray, setViewedStartDateArray] = useState([]);

  const getBookingsData = async (startDate, endDate) => {
    setViewedStartDateArray((prevDates) => [...prevDates, startDate]);
    console.log("Start date array in getBookingData: " + viewedStartDateArray);

    setIsLoading(true);
    try {
      const response = await fetchGETRequest(
        `/schedule/owner/get-schedule?start_date=${startDate.toISOString()}&end_date=${endDate.toISOString()}`
      );

      if (
        response?.statusCode === 200 &&
        response.schedule &&
        response.fleet &&
        response.pilots
      ) {
        const bookings = response.schedule;
        const planes = response.fleet;
        const pilots = response.pilots;

        const scheduleData = bookings.map((item) => ({
          Id: item.schedule_id,
          Subject: item.title || "No Title",
          StartTime: new Date(item.booking_start_time),
          EndTime: new Date(item.booking_end_time),
          TailNumber: "plane",
          PilotId: item.tail_number,
        }));

        const planeData = planes.map((plane) => ({
          text: plane.tail_number,
          id: plane.tail_number,
          groupId: "plane",
          color: COLOR_OBJECT.primary,
        }));

        const pilotData = pilots.map((pilot, index) => ({
          text: `${pilot.user.first_name} ${pilot.user.last_name}`,
          id: pilot.user_id,
          groupId: "pilot",
          color: index % 2 === 0 ? "#ea7a57" : "#5978ee",
        }));

        setData(scheduleData);
        setPilotData([...planeData, ...pilotData]);
      } else {
        console.error("Error fetching data:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isDateViewed = (date) => {
    for (let d of viewedStartDateArray) {
      const startDate = new Date(d);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 30);
      if (date >= startDate && date <= endDate) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    console.log("Updated start date array: ", viewedStartDateArray);
  }, [viewedStartDateArray]);

  const handleNavigation = async (args) => {
    const newDate = new Date(args.currentDate);
    console.log("Navigated to: " + newDate.toISOString());

    const viewed = isDateViewed(newDate);
    console.log("Date viewed: " + viewed);

    if (!viewed) {
      const startDate = new Date(newDate);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 30);
      console.log(
        "Fetching new data for: " +
          startDate.toISOString() +
          " to " +
          endDate.toISOString()
      );

      await getBookingsData(startDate, endDate);

      setViewedStartDateArray((prevDates) => [...prevDates, startDate]);
      setSelectedDate(newDate);
    } else {
      setSelectedDate(newDate);
    }
  };

  useEffect(() => {
    const today = new Date();
    if (!isDateViewed(today)) {
      const startDate = new Date(selectedDate);
      startDate.setDate(startDate.getDate() - 1);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(endDate.getDate() + 1);
      getBookingsData(startDate, endDate);
    }
  }, []);

  const fleetData = [
    { text: "PLANES", id: "plane", color: "#cb6bb2" },
    { text: "PILOTS", id: "pilot", color: "#56ca85" },
  ];

  return (
    <>
      <HelmetComponent title={`${EDISPATCHED} | Calendar`} />
      <Typography variant="h4" gutterBottom>
        Calendar
      </Typography>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div className="schedule-control-section">
          <div className="col-lg-12 control-section">
            <div className="control-wrapper">
              <ScheduleComponent
                cssClass="timeline-resource-grouping"
                width="100%"
                height="auto"
                rowAutoHeight={true}
                showQuickInfo={false}
                selectedDate={selectedDate}
                currentView="TimelineWeek"
                navigating={handleNavigation}
                eventSettings={{
                  dataSource: data,
                  ignoreWhitespace: true,
                  allowEditing: false,
                  allowAdding: false,
                }}
                group={{ resources: ["Planes", "Pilots"] }}
              >
                <ResourcesDirective>
                  <ResourceDirective
                    field="TailNumber"
                    title="Select Plane"
                    name="Planes"
                    allowMultiple={false}
                    dataSource={fleetData}
                    textField="text"
                    idField="id"
                    colorField="color"
                  />
                  <ResourceDirective
                    field="PilotId"
                    title="Pilot"
                    name="Pilots"
                    allowMultiple={true}
                    dataSource={PilotData}
                    textField="text"
                    idField="id"
                    groupIDField="groupId"
                    colorField="color"
                  />
                </ResourcesDirective>
                <ViewsDirective>
                  <ViewDirective option="TimelineDay" />
                  <ViewDirective option="TimelineWeek" />
                  <ViewDirective option="TimelineMonth" />
                  <ViewDirective option="Agenda" />
                </ViewsDirective>
                <Inject
                  services={[
                    TimelineViews,
                    TimelineMonth,
                    Agenda,
                    Resize,
                    DragAndDrop,
                  ]}
                />
              </ScheduleComponent>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CalendarPage;
