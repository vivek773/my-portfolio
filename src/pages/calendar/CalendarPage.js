import React, { useState, useEffect, useRef } from "react";
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
import { EDISPATCHED_HELMET } from "../../utils/Constants";
import "./timeline-resource-grouping.css";
import { fetchGETRequest } from "../../utils/Services";
import { COLOR_OBJECT } from "../../utils/Color";

const CalendarPage = () => {
  const [data, setData] = useState([]);
  const [PilotData, setPilotData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("TimelineDay");
  const scheduleRef = useRef(null);

  const getBookingsData = async (startDate, endDate) => {
    console.log({ startDate, endDate }, "Asasa");
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

  const fleetData = [
    { text: "PLANES", id: "plane", color: "#cb6bb2" },
    { text: "PILOTS", id: "pilot", color: "#56ca85" },
  ];
  useEffect(() => {
    let startDate = new Date(selectedDate);
    let endDate = new Date(selectedDate);
    switch (view) {
      case "TimelineDay":
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        break;
      case "TimelineWeek":
        startDate.setDate(startDate.getDate() - startDate.getDay());
        startDate.setHours(0, 0, 0, 0);
        endDate.setDate(startDate.getDate() + 6);
        endDate.setHours(23, 59, 59, 999);
        break;
      case "TimelineMonth":
        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth() + 1,
          0
        );
        endDate.setHours(23, 59, 59, 999);
        break;
      case "Agenda":
        startDate.setHours(0, 0, 0, 0);
        endDate.setDate(startDate.getDate() + 30);
        endDate.setHours(23, 59, 59, 999);
        break;
      default:
        break;
    }
    getBookingsData(startDate, endDate);
  }, [view, selectedDate]);
  const handleNavigating = (args) => {
    if (args?.action == "date") {
      setSelectedDate(args?.currentDate);
    }
    if (args?.action == "view") {
      setView(args?.currentView);
    }
  };

  return (
    <>
      <HelmetComponent title={`${EDISPATCHED_HELMET} Calendar`} />
      <Typography variant="h4" gutterBottom>
        Calendar
      </Typography>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div className="schedule-control-section">
          <div className="col-lg-12 control-section">
            <div className="control-wrapper">
              <ScheduleComponent
                ref={scheduleRef}
                cssClass="timeline-resource-grouping"
                width="100%"
                height="auto"
                rowAutoHeight={true}
                showQuickInfo={false}
                //  selectedDate={selectedDate}
                currentView={view}
                eventSettings={{
                  dataSource: data,
                  ignoreWhitespace: true,
                  allowEditing: false,
                  allowAdding: false,
                }}
                group={{ resources: ["Planes", "Pilots"] }}
                navigating={handleNavigating}
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
