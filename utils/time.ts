import moment from 'moment'
import "moment/locale/ru"


export const getCreationDate = (time: string) => {
    moment.locale('ru')
    return moment(time).startOf('second').fromNow()
}