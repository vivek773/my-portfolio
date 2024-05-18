
// Helpers

// Moment
import moment from "moment"

export const formatDate = (date, format = "MM/DD/YYYY") => {
  if(date) {
    return moment(date).format(format)
  }
  return null
}